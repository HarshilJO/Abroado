import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  features = ['Expert Study Visa Guidance', 'Hassle-free Visitor Visa Processing', '98% Visa Approval Success Rate'];
  activeCard: 1 | 2 = 1;

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  get companyExperience(): number {
    return Math.max(1, new Date().getFullYear() - 2022);
  }
}
