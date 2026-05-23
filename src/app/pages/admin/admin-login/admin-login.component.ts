import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  pin = '';
  error = false;
  loading = false;

  constructor(private blogService: BlogService, private router: Router) {
    if (this.blogService.isAdminLoggedIn()) this.router.navigate(['/admin/blog']);
  }

  onLogin(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.error = false;
    setTimeout(() => {
      if (this.blogService.adminLogin(this.pin)) {
        this.router.navigate(['/admin/blog']);
      } else {
        this.error = true;
        this.loading = false;
        this.pin = '';
      }
    }, 800);
  }
}
