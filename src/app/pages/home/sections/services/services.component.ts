import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface VisaCard {
  icon: SafeHtml;
  badge: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  visaCards: VisaCard[];

  constructor(private sanitizer: DomSanitizer) {
    this.visaCards = [
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 28l18-10-18-10-18 10 18 10z"/><path d="M6 18v12c0 6 8 10 18 10s18-4 18-10V18"/><path d="M42 18v16"/><circle cx="42" cy="38" r="4"/></svg>`),
        badge: 'Most Popular', title: 'Study Visa',
        description: 'Pursue world-class education in the UK and Australia. We guide you from university selection to visa approval.',
        features: ['University Selection & Shortlisting', 'Application & SOP Writing', 'Scholarship Guidance', 'IELTS/PTE Preparation', 'Complete Visa Documentation', 'Pre-departure Briefing'],
        cta: 'Apply for Study Visa'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="20"/><ellipse cx="24" cy="24" rx="8" ry="20"/><path d="M4 24h40"/><path d="M6 14h36"/><path d="M6 34h36"/></svg>`),
        badge: 'Travel Ready', title: 'Visitor Visa',
        description: 'Explore the UK and Australia for tourism, business, or visiting family. Quick processing with high approval rates.',
        features: ['Tourist Visa Processing', 'Business Visa Support', 'Family Visit Visa', 'Travel Itinerary Planning', 'Document Verification', 'Interview Preparation'],
        cta: 'Apply for Visitor Visa'
      }
    ];
  }

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}
