import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course'; 
@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard {
  @Input() course!: Course;

  get safeLink(): string {
    // Try to get link from either root (if added) or nested course object
    const rawLink = this.course.link || (this.course.course as any)?.link;
    
    if (!rawLink) {
      // Fallback to searching the course name and provider
      const query = `${this.course.course?.name || this.course.course} ${this.course.provider}`;
      return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    // If it's already a valid URL, return it
    if (rawLink.startsWith('http://') || rawLink.startsWith('https://')) {
      return rawLink;
    }

    // If it's a page title or invalid URL string, generate a search URL
    return `https://www.google.com/search?q=${encodeURIComponent(rawLink)}`;
  }
}
