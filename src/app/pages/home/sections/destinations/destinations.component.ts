import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent {
  constructor(private router: Router) {}
  destinations = [
    {
      flagImg: 'https://flagcdn.com/w40/gb.png',
      flagAlt: 'UK Flag',
      name: 'United Kingdom', tagline: 'Excellence in Education Since Centuries',
      badge: 'Top Ranked',
      img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
      headerBg: 'linear-gradient(135deg, #012169, #0052a5)',
      description: 'Home to world-renowned universities like Oxford, Cambridge, and Imperial College. Experience cutting-edge research facilities and a rich cultural heritage.',
      highlights: [{ num: '100+', text: 'Partner Universities' }, { num: '1-2', text: 'Year Programs' }, { num: 'Up to 2 Yrs', text: 'Post-Study Work' }],
      features: ['Globally Recognized Degrees', 'Rich Cultural Experience', 'Work While Studying', 'Scholarship Opportunities']
    },
    {
      flagImg: 'https://flagcdn.com/w40/au.png',
      flagAlt: 'Australia Flag',
      name: 'Australia', tagline: 'Innovation Meets Natural Beauty',
      badge: 'Most Popular',
      img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
      headerBg: 'linear-gradient(135deg, #00008B, #0052a5)',
      description: 'Discover world-class education in a land of stunning landscapes. Australian universities consistently rank among the global top 100.',
      highlights: [{ num: '50+', text: 'Partner Universities' }, { num: '2-3', text: 'Year Programs' }, { num: 'Up to 4 Yrs', text: 'Post-Study Work' }],
      features: ['High Quality of Life', 'Multicultural Environment', 'Part-time Work Rights', 'PR Pathway Options']
    },
    {
      flagImg: 'https://flagcdn.com/w40/us.png',
      flagAlt: 'USA Flag',
      name: 'USA', tagline: 'Land of Opportunities',
      badge: 'Highly Desired',
      img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      headerBg: 'linear-gradient(135deg, #0A3161, #B31942)',
      description: 'Studying in the United States is a popular choice for international students due to its world-class universities, diverse academic programs, and cultural opportunities.',
      highlights: [{ num: '4000+', text: 'Institutions' }, { num: '1-4', text: 'Year Programs' }, { num: 'Up to 3 Yrs', text: 'OPT' }],
      features: ['Flexible Education System', 'Cutting-edge Technology', 'Campus Life Experience', 'Global Networking']
    },
    {
      flagImg: 'https://flagcdn.com/w40/ca.png',
      flagAlt: 'Canada Flag',
      name: 'Canada', tagline: 'Quality Education & High Living Standards',
      badge: 'Student Friendly',
      img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80',
      headerBg: 'linear-gradient(135deg, #FF0000, #8B0000)',
      description: 'Studying in Canada is a popular choice for international students due to its high-quality education system, cultural diversity, and beautiful landscapes.',
      highlights: [{ num: '90+', text: 'Public Universities' }, { num: '1-4', text: 'Year Programs' }, { num: 'Up to 3 Yrs', text: 'PGWP' }],
      features: ['Affordable Tuition', 'Safe and Welcoming', 'Immigration Opportunities', 'Bilingual Environment']
    },
    {
      flagImg: 'https://flagcdn.com/w40/nz.png',
      flagAlt: 'New Zealand Flag',
      name: 'New Zealand', tagline: 'A Safe and Stunning Study Destination',
      badge: 'Emerging',
      img: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80',
      headerBg: 'linear-gradient(135deg, #00247D, #CC142B)',
      description: 'Studying in New Zealand offers a unique experience with its world-class education, stunning natural landscapes, and welcoming multicultural environment.',
      highlights: [{ num: '8', text: 'State Universities' }, { num: '1-3', text: 'Year Programs' }, { num: 'Up to 3 Yrs', text: 'Post-Study Work' }],
      features: ['High Educational Standards', 'Excellent Support Services', 'Work During Studies', 'Unmatched Scenery']
    }
  ];

  exploreCourses(countryName: string) {
    const supportedCountries = ['United Kingdom', 'Australia'];
    
    if (supportedCountries.includes(countryName)) {
      // Map display name to the filter value used in the data
      const countryMap: Record<string, string> = {
        'United Kingdom': 'UK',
        'Australia': 'Australia'
      };
      const country = countryMap[countryName] || countryName;
      this.router.navigate(['/courses'], { queryParams: { country } });
    } else {
      this.router.navigate(['/coming-soon'], { queryParams: { country: countryName } });
    }
  }

  scrollTo(e: Event, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
