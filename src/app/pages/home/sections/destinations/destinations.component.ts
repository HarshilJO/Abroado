import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {
  destinations = [
    {
      flag: '🇬🇧', name: 'United Kingdom', tagline: 'Excellence in Education Since Centuries',
      badge: 'Top Ranked', img: 'images/uk-hero.jpg',
      headerBg: 'linear-gradient(135deg, #012169, #0052a5)',
      description: 'Home to world-renowned universities like Oxford, Cambridge, and Imperial College. Experience cutting-edge research facilities and a rich cultural heritage.',
      highlights: [{ num: '100+', text: 'Partner Universities' }, { num: '1-2', text: 'Year Programs' }, { num: '2 Yr', text: 'Post-Study Work' }],
      features: ['Globally Recognized Degrees', 'Rich Cultural Experience', 'Work While Studying', 'Scholarship Opportunities']
    },
    {
      flag: '🇦🇺', name: 'Australia', tagline: 'Innovation Meets Natural Beauty',
      badge: 'Most Popular', img: 'images/australia-hero.jpg',
      headerBg: 'linear-gradient(135deg, #00008B, #0052a5)',
      description: 'Discover world-class education in a land of stunning landscapes. Australian universities consistently rank among the global top 100.',
      highlights: [{ num: '50+', text: 'Partner Universities' }, { num: '2-3', text: 'Year Programs' }, { num: '4 Yr', text: 'Post-Study Work' }],
      features: ['High Quality of Life', 'Multicultural Environment', 'Part-time Work Rights', 'PR Pathway Options']
    }
  ];

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}
