import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  posts: BlogPost[] = [];
  statCards: { icon: string; value: number; label: string }[] = [];

  categories = [
    { value: 'visa-tips', label: 'Visa Tips' }, { value: 'student-life', label: 'Student Life' },
    { value: 'destinations', label: 'Destinations' }, { value: 'news', label: 'News' },
    { value: 'success-stories', label: 'Success Stories' }
  ];

  constructor(private blogService: BlogService, private router: Router) {
    if (!this.blogService.isAdminLoggedIn()) this.router.navigate(['/admin']);
  }

  ngOnInit() { this.loadData(); }

  loadData() {
    this.posts = this.blogService.getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const stats = this.blogService.getStats();
    this.statCards = [
      { icon: '📝', value: stats.total, label: 'Total Posts' },
      { icon: '✅', value: stats.published, label: 'Published' },
      { icon: '📋', value: stats.drafts, label: 'Drafts' }
    ];
  }

  getCatLabel(cat: string): string {
    return this.categories.find(c => c.value === cat)?.label || cat;
  }

  togglePublish(post: BlogPost) {
    this.blogService.togglePublish(post.id);
    this.loadData();
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(id);
      this.loadData();
    }
  }

  logout() {
    this.blogService.adminLogout();
    this.router.navigate(['/admin']);
  }
}
