import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials = [
    { type: 'Study Visa - Australia', quote: 'Abroado made my dream of studying at the University of Melbourne come true. Their guidance throughout the visa process was exceptional. I couldn\'t have done it without them!', name: 'Priya Sharma', initials: 'PS', university: 'University of Melbourne, Australia' },
    { type: 'Study Visa - UK', quote: 'From IELTS prep to getting my UK student visa, Abroado was with me every step. Now I\'m pursuing my Master\'s at University of Manchester. Highly recommend!', name: 'Rahul Kumar', initials: 'RK', university: 'University of Manchester, UK' },
    { type: 'Visitor Visa - UK', quote: 'Got my UK tourist visa approved in just 10 days! The team at Abroado handled everything perfectly. Had an amazing trip to London. Thank you!', name: 'Anita Mehta', initials: 'AM', university: 'Tourist Visa - United Kingdom' },
    { type: 'Visitor Visa - Australia', quote: 'Visited my daughter in Sydney thanks to Abroado. They made the visitor visa process so simple for me. Professional and caring team!', name: 'Suresh Patel', initials: 'SP', university: 'Family Visitor Visa - Australia' }
  ];

  current = 0;
  offset = 0;
  perView = 1;
  private autoPlay: any;

  get dots() { return Array(Math.ceil(this.testimonials.length / this.perView)).fill(0); }

  ngOnInit() {
    this.updatePerView();
    window.addEventListener('resize', () => this.updatePerView());
    this.autoPlay = setInterval(() => this.next(), 5000);
  }

  ngOnDestroy() { clearInterval(this.autoPlay); }

  updatePerView() {
    if (window.innerWidth >= 1024) this.perView = 3;
    else if (window.innerWidth >= 768) this.perView = 2;
    else this.perView = 1;
    this.offset = 0; this.current = 0;
  }

  updateOffset() {
    const cardW = document.querySelector('.testimonial-card')?.clientWidth || 300;
    this.offset = this.current * (cardW + 32);
  }

  next() {
    const max = Math.ceil(this.testimonials.length / this.perView) - 1;
    this.current = this.current >= max ? 0 : this.current + 1;
    this.updateOffset();
  }

  prev() {
    const max = Math.ceil(this.testimonials.length / this.perView) - 1;
    this.current = this.current <= 0 ? max : this.current - 1;
    this.updateOffset();
  }

  goTo(i: number) { this.current = i; this.updateOffset(); clearInterval(this.autoPlay); this.autoPlay = setInterval(() => this.next(), 5000); }
}
