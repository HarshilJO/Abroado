import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent implements AfterViewInit {
  activeRecCard: 1 | 2 = 1;

  get companyExperience(): number {
    return Math.max(1, new Date().getFullYear() - 2022);
  }

  get dhavalExperience(): number {
    return Math.max(1, new Date().getFullYear() - 2014);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.scrollTo(0, 0);
      const elements = document.querySelectorAll('.about-page [data-animate]');
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
