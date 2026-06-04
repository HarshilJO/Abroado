import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  paginatedPosts: BlogPost[] = [];
  featuredPost: BlogPost | undefined;
  searchQuery = '';
  activeCategory = 'all';
  currentPage = 0;
  postsPerPage = 6;
  totalPages = 1;

  categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'visa-tips', label: 'Visa Tips' },
    { value: 'student-life', label: 'Student Life' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'news', label: 'News' },
    { value: 'success-stories', label: 'Success Stories' }
  ];

  instagramPosts = [
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/uk-hero.jpg' },
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/australia-hero.jpg' },
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/students-hero.jpg' },
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/travel-hero.jpg' },
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/uk-hero.jpg' },
    { url: 'https://www.instagram.com/abroado_edu/', thumb: 'images/australia-hero.jpg' }
  ];

  get allTags(): string[] {
    const tags = new Set<string>();
    this.posts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).slice(0, 15);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.posts = this.blogService.getPublishedPosts();
    this.featuredPost = this.posts[0];
    this.filterPosts();
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    this.currentPage = 0;
    this.filterPosts();
  }

  filterPosts() {
    let result = this.posts;
    if (this.activeCategory !== 'all') {
      result = result.filter(p => p.category === this.activeCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    this.filteredPosts = result;
    this.totalPages = Math.max(1, Math.ceil(result.length / this.postsPerPage));
    this.paginate();
  }

  paginate() {
    const start = this.currentPage * this.postsPerPage;
    this.paginatedPosts = this.filteredPosts.slice(start, start + this.postsPerPage);
  }

  getCategoryLabel(cat: string): string {
    return this.categories.find(c => c.value === cat)?.label || cat;
  }
}
