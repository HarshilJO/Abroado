import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/blog',
    loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/blog/new',
    loadComponent: () => import('./pages/admin/post-editor/post-editor.component').then(m => m.PostEditorComponent)
  },
  {
    path: 'admin/blog/edit/:id',
    loadComponent: () => import('./pages/admin/post-editor/post-editor.component').then(m => m.PostEditorComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/home/sections/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'coming-soon',
    loadComponent: () => import('./pages/coming-soon/coming-soon.component').then(m => m.ComingSoonComponent)
  },
  { path: '**', redirectTo: '' }
];
