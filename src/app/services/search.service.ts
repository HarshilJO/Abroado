import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Fuse from 'fuse.js';
import { Course } from '../utils/modules/course-search/models/course'; 
import * as ausData from './universities/search_index_australia.json';
import * as ukData from './universities/search_index_uk.json';

// TypeScript imports JSON as a module, so the array is on the 'default' property or directly accessible
const australiaData = (ausData as any).default || ausData;
const ukDataArray = (ukData as any).default || ukData;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private allCourses: Course[] = [...australiaData, ...ukDataArray];
  private fuse: Fuse<Course>;
  
  // Reactive state management
  private resultsSubject = new BehaviorSubject<Course[]>(this.allCourses);
  public results$ = this.resultsSubject.asObservable();

  // Sorted unique list of providers (universities)
  private _universities: string[] = [];
  private universitiesSubject = new BehaviorSubject<string[]>([]);
  public universities$ = this.universitiesSubject.asObservable();

  constructor() {
    // Initialize the Fuzzy Search Engine
    this.fuse = new Fuse(this.allCourses, {
      keys: [
        'course.name',
        'provider',
        'country',
        'campus_locations',
        'course.level',
        'intakes.list'
      ],
      threshold: 0.3, // 0.0 is exact match, 1.0 is very fuzzy
      includeScore: true,
      useExtendedSearch: true // Allows AND/OR operators
    });

    // Build sorted unique universities list
    this._universities = [...new Set(this.allCourses.map(c => c.provider))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    this.universitiesSubject.next(this._universities);
  }

  // Triggered when the user types in the search bar
  public search(query: string, filters?: any): void {
    let results = this.allCourses;

    // 1. Keyword Fuzzy Search
    if (query && query.trim() !== '') {
      const fuseResults = this.fuse.search(query);
      results = fuseResults.map(res => res.item);
    }

    // 2. Exact Filters (Country, Level, University)
    if (filters) {
      results = results.filter(course => {
        let matches = true;
        if (filters.country && course.country !== filters.country) matches = false;
        if (filters.level && course.course.level !== filters.level) matches = false;
        if (filters.maxFee && course.fees.tuition_numeric > filters.maxFee) matches = false;
        if (filters.university && course.provider !== filters.university) matches = false;
        return matches;
      });
    }

    // Update the UI Reactively
    this.resultsSubject.next(results);

    // Update university list to only show providers available in current filtered country
    if (filters?.country) {
      const filtered = this.allCourses.filter(c => c.country === filters.country);
      const unis = [...new Set(filtered.map(c => c.provider))].filter(Boolean).sort((a, b) => a.localeCompare(b));
      this.universitiesSubject.next(unis);
    } else {
      this.universitiesSubject.next(this._universities);
    }
  }
}