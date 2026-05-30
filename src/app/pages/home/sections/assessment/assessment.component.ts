import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    income: ''
  };
  submitting = false;
  submitted = false;

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.form.dob || !this.form.qualification || !this.form.country) return;
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      this.form = { dob: '', qualification: '', gap: '', country: '', course: '', budget: '', income: '' };
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
