import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SearchService } from '../../../../../services/search.service';
import { Course } from '../../models/course';
import { FilterSidebar } from '../filter-sidebar/filter-sidebar';
import { CourseCard } from '../course-card/course-card';
import { SearchBar } from '../search-bar/search-bar';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-search-container',
  imports: [CommonModule, FilterSidebar, CourseCard, SearchBar],
  templateUrl: './search-container.html',
  styleUrl: './search-container.css',
})
export class SearchContainer implements OnInit {
  /** Full results stream */
  results$!: Observable<Course[]>;
  universities$!: Observable<string[]>;

  /** Paginated slice shown to the user */
  pagedResults$!: Observable<Course[]>;
  totalResults$!: Observable<number>;
  totalPages$!: Observable<number>;

  currentPage = 1;
  pageSize = PAGE_SIZE;

  /** Tracks the live-selected country (synced to sidebar select) */
  activeCountry: string = '';
  activeFilterLabels: string[] = [];

  private currentQuery: string = '';
  private activeFilters: any = { country: '', level: '', university: '', maxFee: null };

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.results$ = this.searchService.results$;
    this.universities$ = this.searchService.universities$;

    this.totalResults$ = this.results$.pipe(map(r => r.length));
    this.totalPages$ = this.results$.pipe(map(r => Math.ceil(r.length / PAGE_SIZE)));
    this.refreshPage();

    // Read ?country= query param and pre-apply filter once
    this.route.queryParams.subscribe(params => {
      const country = params['country'] || '';
      if (country) {
        this.activeFilters.country = country;
        this.activeCountry = country;
        this.updateLabels();
        this.goToPage(1);
        this.triggerSearch();
      }
    });
  }

  onSearch(query: string): void {
    this.currentQuery = query;
    this.goToPage(1);
    this.triggerSearch();
  }

  onFilterUpdate(filter: { key: string, value: string }): void {
    this.activeFilters[filter.key] = filter.value;

    if (filter.key === 'country') {
      this.activeCountry = filter.value;
      this.activeFilters.university = '';
    }

    this.updateLabels();
    this.goToPage(1);
    this.triggerSearch();
  }

  onReset(): void {
    this.activeFilters = { country: '', level: '', university: '', maxFee: null };
    this.activeCountry = '';
    this.currentQuery = '';
    this.activeFilterLabels = [];
    this.goToPage(1);
    this.triggerSearch();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.refreshPage();
    // Scroll back to top of results
    window.scrollTo({ top: 320, behavior: 'smooth' });
  }

  /** Pages array for the pagination bar (max 7 shown) */
  getPageNumbers(total: number): number[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const cur = this.currentPage;
    const pages: number[] = [];

    if (cur <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push(-1, total);
    } else if (cur >= total - 3) {
      pages.push(1, -1);
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1, -1, cur - 1, cur, cur + 1, -1, total);
    }

    return pages;
  }

  private refreshPage(): void {
    this.pagedResults$ = this.results$.pipe(
      map(results => results.slice(
        (this.currentPage - 1) * PAGE_SIZE,
        this.currentPage * PAGE_SIZE
      ))
    );
  }

  private updateLabels(): void {
    const labels: string[] = [];
    if (this.activeFilters.country)    labels.push(this.activeFilters.country === 'UK' ? 'United Kingdom' : 'Australia');
    if (this.activeFilters.university) labels.push(this.activeFilters.university);
    if (this.activeFilters.level)      labels.push(this.activeFilters.level);
    this.activeFilterLabels = labels;
  }

  private triggerSearch(): void {
    this.searchService.search(this.currentQuery, this.activeFilters);
  }
}
