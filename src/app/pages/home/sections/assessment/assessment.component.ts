import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../../../services/analytics.service';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent implements AfterViewInit {
  form = {
    dob: '',
    qualification: '',
    gap: '',
    country: '',
    course: '',
    budget: '',
    income: '',
    email: ''
  };
  submitting = false;
  submitted = false;

  constructor(private analytics: AnalyticsService) {}

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.dob || !this.form.qualification || !this.form.country || !this.form.email) return;
    this.submitting = true;
    
    const assessmentData = {
      email: this.form.email,
      dob: this.form.dob,
      qualification: this.form.qualification,
      gap: this.form.gap || null,
      country: this.form.country,
      course: this.form.course || null,
      budget: this.form.budget ? this.form.budget.toString() : null,
      income: this.form.income ? this.form.income.toString() : null
    };
    this.analytics.trackAssessment(assessmentData);

    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      this.form = { dob: '', qualification: '', gap: '', country: '', course: '', budget: '', income: '', email: '' };
    }, 1500);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.assessment [data-animate]');
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
