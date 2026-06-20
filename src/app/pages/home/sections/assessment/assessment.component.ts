import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../../../services/analytics.service';
import { formatDateToDDMMYYYY } from '../../../../utils/date.utils';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent implements AfterViewInit {
  form = {
    name: '',
    surname: '',
    dob: '',
    qualification: '',
    gap: '',
    country: '',
    course: '',
    email: ''
  };
  submitting = false;
  submitted = false;

  constructor(private analytics: AnalyticsService) {}

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.name || !this.form.surname || !this.form.dob || !this.form.qualification || !this.form.country || !this.form.email) return;
    this.submitting = true;
    
    const assessmentData = {
      name: this.form.name,
      surname: this.form.surname,
      email: this.form.email,
      dob: formatDateToDDMMYYYY(this.form.dob),
      qualification: this.form.qualification,
      gap: (this.form.gap !== null && this.form.gap !== '') ? String(this.form.gap) : null,
      country: this.form.country,
      course: this.form.course || null
    };
    this.analytics.trackAssessment(assessmentData);

    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      this.form = { name: '', surname: '', dob: '', qualification: '', gap: '', country: '', course: '', email: '' };
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
