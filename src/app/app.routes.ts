import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog-list/blog-list.component').then(m => m.BlogListComponent)
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
  { path: '**', redirectTo: '' }
];
