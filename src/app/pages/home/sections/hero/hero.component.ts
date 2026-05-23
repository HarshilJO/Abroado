import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  slides = [
    { img: 'images/uk-hero.jpg' },
    { img: 'images/australia-hero.jpg' },
    { img: 'images/students-hero.jpg' },
    { img: 'images/travel-hero.jpg' }
  ];
  currentSlide = 0;
  progressWidth = 0;
  private intervalId: any;
  private progressId: any;
  private readonly duration = 6000;

  ngOnInit() {
    this.startSlider();
    this.initAnimations();
  }

  ngOnDestroy() { this.stopSlider(); }

  startSlider() {
    this.intervalId = setInterval(() => this.next(), this.duration);
    this.progressId = setInterval(() => {
      this.progressWidth += 100 / (this.duration / 50);
      if (this.progressWidth >= 100) this.progressWidth = 0;
    }, 50);
  }

  stopSlider() {
    clearInterval(this.intervalId);
    clearInterval(this.progressId);
  }

  resetSlider() {
    this.stopSlider();
    this.progressWidth = 0;
    this.startSlider();
  }

  pauseSlider() { this.stopSlider(); }
  resumeSlider() { this.startSlider(); }

  next() { this.currentSlide = (this.currentSlide + 1) % this.slides.length; }
  prev() { this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length; this.resetSlider(); }
  goTo(i: number) { this.currentSlide = i; this.resetSlider(); }

  scrollTo(id: string, e: Event) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  initAnimations() {
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-animate]');
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
