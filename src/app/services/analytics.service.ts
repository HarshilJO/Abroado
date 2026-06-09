import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Capture UTM source immediately before Angular's HashLocationStrategy rewrites the URL
let initialUtmSource: string | null = null;
if (typeof window !== 'undefined') {
  const url = window.location.href;
  if (url.includes('utm_source=')) {
    const match = url.match(/utm_source=([^&#]+)/);
    if (match) initialUtmSource = match[1];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private sessionIdKey = 'abroado_session_id';
  private sessionId: string = '';
  private currentUrl: string = '';
  private pageEntryTime: number = 0;
  private maxScroll: number = 0;
  private apiUrl = environment.analyticsApiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public initAnalytics(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ensureSessionId();
      this.trackVisitor();
      this.setupPageTracking();
      this.setupScrollTracking();
      this.setupUnloadTracking();
    }
  }

  private ensureSessionId(): void {
    let storedSessionId = localStorage.getItem(this.sessionIdKey);
    if (!storedSessionId) {
      storedSessionId = this.generateUUID();
      localStorage.setItem(this.sessionIdKey, storedSessionId);
    }
    this.sessionId = storedSessionId;
  }

  private trackVisitor(): void {
    let utmSource = initialUtmSource;

    try {
      // Fallback for hash-based routing if parameters get appended after the hash
      if (!utmSource && window.location.hash.includes('?')) {
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
        utmSource = hashParams.get('utm_source');
      }
    } catch (e) {
      console.error('Error parsing UTM parameters', e);
    }

    const source = utmSource || document.referrer || 'direct';
    const payload = {
      session_id: this.sessionId,
      source: source
    };

    this.http.post(`${this.apiUrl}/visitor`, payload).subscribe({
      error: (err) => console.error('Analytics error', err)
    });
  }

  private setupPageTracking(): void {
    this.currentUrl = window.location.href;
    this.pageEntryTime = Date.now();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.recordPageVisit();

      this.currentUrl = window.location.href;
      this.pageEntryTime = Date.now();
      this.maxScroll = 0;
    });
  }

  private setupScrollTracking(): void {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const scrollPosition = (window.scrollY / scrollHeight) * 100;
        if (scrollPosition > this.maxScroll) {
          this.maxScroll = Math.min(100, Math.round(scrollPosition));
        }
      }
    }, { passive: true });
  }

  private setupUnloadTracking(): void {
    window.addEventListener('beforeunload', () => {
      this.recordPageVisit(true);
    });
  }

  private recordPageVisit(isUnload: boolean = false): void {
    if (!this.currentUrl) return;

    const timeSpentSeconds = (Date.now() - this.pageEntryTime) / 1000;

    if (timeSpentSeconds < 1 && isUnload) return;

    const payload = {
      session_id: this.sessionId,
      page_url: this.currentUrl,
      time_spent_seconds: parseFloat(timeSpentSeconds.toFixed(2)),
      scroll_percentage: this.maxScroll
    };

    if (isUnload && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(`${this.apiUrl}/page_visit`, blob);
    } else {
      this.http.post(`${this.apiUrl}/page_visit`, payload).subscribe({
        error: (err) => console.error('Analytics error', err)
      });
    }
  }

  public trackChatbotLog(question: string): void {
    if (!this.sessionId) return;

    const payload = {
      session_id: this.sessionId,
      question: question
    };
    this.http.post(`${this.apiUrl}/chatbot_log`, payload).subscribe({
      error: (err) => console.error('Analytics log error', err)
    });
  }

  public trackLead(name: string, email: string, phone: string, interest?: string): void {
    if (!this.sessionId) return;

    const payload = {
      session_id: this.sessionId,
      name: name,
      email: email,
      phone: phone,
      interest: interest || null
    };
    this.http.post(`${this.apiUrl}/lead`, payload).subscribe({
      error: (err) => console.error('Analytics lead error', err)
    });
  }

  public trackNewsletter(email: string): void {
    if (!this.sessionId) return;

    const payload = {
      session_id: this.sessionId,
      email: email
    };
    this.http.post(`${this.apiUrl}/newsletter`, payload).subscribe({
      error: (err) => console.error('Analytics newsletter error', err)
    });
  }

  public trackAssessment(data: any): void {
    if (!this.sessionId) return;

    const payload = {
      session_id: this.sessionId,
      ...data
    };
    this.http.post(`${this.apiUrl}/assessment`, payload).subscribe({
      error: (err) => console.error('Analytics assessment error', err)
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
