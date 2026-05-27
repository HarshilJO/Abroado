import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ContactItem {
  icon: SafeHtml;
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  form = { firstName: '', lastName: '', email: '', phone: '', visaType: '', destination: '', message: '' };
  submitting = false;
  submitted = false;

  contactItems: ContactItem[];

  constructor(private sanitizer: DomSanitizer) {
    this.contactItems = [
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`),
        label: 'Visit Our Office', value: '201, Sangath Mall-1, Motera, Ahmedabad-382424, Gujarat'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`),
        label: 'Call Us', value: '+91-7778832033'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`),
        label: 'Email Us', value: 'info@abroado.in'
      }
    ];
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.firstName || !this.form.email || !this.form.phone) return;
    this.submitting = true;
    setTimeout(() => { this.submitting = false; this.submitted = true; this.form = { firstName: '', lastName: '', email: '', phone: '', visaType: '', destination: '', message: '' }; }, 1500);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.contact [data-animate]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset['delay'] || '0';
            setTimeout(() => entry.target.classList.add('animated'), +delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}
