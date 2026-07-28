import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface VisaCard {
  icon: SafeHtml;
  badge: string;
  badgeClass?: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  ctaType: 'internal' | 'external';
  ctaLink: string;
  btnClass: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  visaCards: VisaCard[];

  constructor(private sanitizer: DomSanitizer) {
    this.visaCards = [
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 28l18-10-18-10-18 10 18 10z"/><path d="M6 18v12c0 6 8 10 18 10s18-4 18-10V18"/><path d="M42 18v16"/><circle cx="42" cy="38" r="4"/></svg>`),
        badge: 'Most Popular', title: 'Study Visa',
        description: 'Pursue world-class education in the UK and Australia. We guide you from university selection to visa approval.',
        features: ['University Selection & Shortlisting', 'Application & SOP Writing', 'Scholarship Guidance', 'IELTS/PTE Preparation', 'Complete Visa Documentation', 'Pre-departure Briefing'],
        cta: 'Apply for Study Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Study%20Visa.',
        btnClass: 'btn-primary'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`),
        badge: 'Travel Ready', title: 'Visitor Visa',
        badgeClass: 'visitor',
        description: 'Explore the UK and Australia for tourism, business, or visiting family. Quick processing with high approval rates.',
        features: ['Tourist Visa Processing', 'Business Visa Support', 'Family Visit Visa', 'Travel Itinerary Planning', 'Document Verification', 'Interview Preparation'],
        cta: 'Apply for Visitor Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Visitor%20Visa.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`),
        badge: 'Leisure', title: 'Tourist Visa',
        badgeClass: 'visitor',
        description: 'Experience your dream holidays abroad. We make the tourist visa application process simple and straightforward.',
        features: ['Itinerary Assistance', 'Hotel Bookings Support', 'Flight Reservations', 'Document Verification', 'Quick Processing'],
        cta: 'Apply for Tourist Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Tourist%20Visa.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`),
        badge: 'Family', title: 'Spouse / Dependent Visa',
        badgeClass: 'visitor',
        description: 'Reunite with your loved ones abroad. We provide complete support for your spouse and dependent visa applications.',
        features: ['Relationship Proof Guidance', 'Financial Documentation', 'Application Tracking', 'Interview Preparation', 'Family Unity Support'],
        cta: 'Apply for Dependent Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Spouse%20/%20Dependent%20Visa.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`),
        badge: 'Reunion', title: 'Parents Visa',
        badgeClass: 'visitor',
        description: 'Bring your parents to join you abroad. Expert assistance with long-term and short-term parent visa categories.',
        features: ['Sponsorship Guidance', 'Healthcare Advice', 'Document Preparation', 'Application Filing', 'Ongoing Support'],
        cta: 'Apply for Parents Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Parents%20Visa.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`),
        badge: 'Career', title: 'Post Graduation Work Permit',
        badgeClass: 'visitor',
        description: 'Transition smoothly from student to professional. We help you secure your PGWP to kickstart your international career.',
        features: ['Eligibility Assessment', 'Timely Application', 'Employer Specific Advice', 'Extension Support', 'Career Pathway Counseling'],
        cta: 'Apply for PGWP',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Post%20Graduation%20Work%20Permit.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`),
        badge: 'Settle', title: 'Permanent Visa',
        badgeClass: 'visitor',
        description: 'Make your dream destination your permanent home. End-to-end support for your permanent residency applications.',
        features: ['Points Assessment', 'Express Entry Guidance', 'State Sponsorship', 'Nomination Support', 'Settlement Advice'],
        cta: 'Apply for PR',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Permanent%20Visa.',
        btnClass: 'btn-dark'
      },
      {
        icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`),
        badge: 'Care', title: 'Medical Visa',
        badgeClass: 'visitor',
        description: 'Travel for medical treatment with priority processing. We ensure your application is handled with utmost urgency.',
        features: ['Hospital Invitation Proof', 'Financial Guarantees', 'Priority Processing', 'Accompanying Attendant', 'Health Clearance Guidance'],
        cta: 'Apply for Medical Visa',
        ctaType: 'external',
        ctaLink: 'https://wa.me/917778832033?text=Hello%20Abroado%2C%20I%20am%20interested%20in%20applying%20for%20a%20Medical%20Visa.',
        btnClass: 'btn-dark'
      }
    ];
  }

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  scrollCards(direction: number) {
    if (this.slider && this.slider.nativeElement) {
      const container = this.slider.nativeElement;
      const scrollAmount = container.clientWidth / 2; // scroll by one card (half container)
      container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
    }
  }
}
