import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements AfterViewInit {
  stats = [
    { count: 5000, suffix: '+', label: 'Students Placed' },
    { count: 98, suffix: '%', label: 'Visa Success' },
    { count: 150, suffix: '+', label: 'Universities' }
  ];

  ngAfterViewInit() { this.animateCounters(); }

  animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset['count'] || '0');
          const duration = 2500;
          const start = performance.now();
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(easeOut(progress) * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString();
          };
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }
}
