import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  showTerms = false;
  showPrivacy = false;

  constructor(private analytics: AnalyticsService) {}

  onSubscribe(e: Event) {
    e.preventDefault();
    if (this.newsletterEmail) {
      this.analytics.trackNewsletter(this.newsletterEmail);
      alert('Thank you for subscribing!');
      this.newsletterEmail = '';
    }
  }

  openTerms(e: Event) {
    e.preventDefault();
    this.showTerms = true;
    document.body.style.overflow = 'hidden';
  }

  closeTerms() {
    this.showTerms = false;
    document.body.style.overflow = '';
  }

  openPrivacy(e: Event) {
    e.preventDefault();
    this.showPrivacy = true;
    document.body.style.overflow = 'hidden';
  }

  closePrivacy() {
    this.showPrivacy = false;
    document.body.style.overflow = '';
  }
}
