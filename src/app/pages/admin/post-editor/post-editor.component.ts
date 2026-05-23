import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog.service';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.scss'
})
export class PostEditorComponent implements OnInit {
  isEdit = false;
  saving = false;
  editId = '';
  tagsInput = '';

  form = {
    title: '', slug: '', excerpt: '', content: '', category: '' as BlogPost['category'] | '',
    author: 'Abroado Team', authorAvatar: 'AT', date: new Date().toISOString().split('T')[0],
    coverImage: '', instagramUrl: '', readTime: 5, published: false
  };

  categories = [
    { value: 'visa-tips', label: 'Visa Tips' }, { value: 'student-life', label: 'Student Life' },
    { value: 'destinations', label: 'Destinations' }, { value: 'news', label: 'News' },
    { value: 'success-stories', label: 'Success Stories' }
  ];

  defaultImages = [
    { label: 'UK', path: 'images/uk-hero.jpg' },
    { label: 'Australia', path: 'images/australia-hero.jpg' },
    { label: 'Students', path: 'images/students-hero.jpg' },
    { label: 'Travel', path: 'images/travel-hero.jpg' }
  ];

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) {
    if (!this.blogService.isAdminLoggedIn()) this.router.navigate(['/admin']);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.editId = id;
      const post = this.blogService.getPostById(id);
      if (post) {
        this.form = { ...post, instagramUrl: post.instagramUrl ?? '', category: post.category as BlogPost['category'] | '' };
        this.tagsInput = post.tags.join(', ');
      }
    }
  }

  autoSlug() {
    if (!this.isEdit) {
      this.form.slug = this.blogService.generateSlug(this.form.title);
    }
  }

  insertMarkdown(start: string, end = '') {
    const ta = document.querySelector('.content-textarea') as HTMLTextAreaElement;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = ta.value.substring(s, e);
    const newVal = ta.value.substring(0, s) + start + sel + end + ta.value.substring(e);
    this.form.content = newVal;
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + start.length, s + start.length + sel.length); }, 0);
  }

  save(publish: boolean) {
    if (!this.form.title || !this.form.excerpt || !this.form.content) {
      alert('Please fill in title, excerpt, and content.');
      return;
    }
    this.saving = true;
    this.form.published = publish;
    const tags = this.tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    setTimeout(() => {
      if (this.isEdit) {
        this.blogService.updatePost(this.editId, { ...this.form, category: this.form.category as BlogPost['category'], tags });
      } else {
        this.blogService.createPost({ ...this.form, category: this.form.category as BlogPost['category'], tags });
      }
      this.saving = false;
      this.router.navigate(['/admin/blog']);
    }, 800);
  }
}
