import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;
  relatedPosts: BlogPost[] = [];
  renderedContent = '';
  readProgress = 0;
  copied = false;

  categories = [
    { value: 'visa-tips', label: 'Visa Tips' },
    { value: 'student-life', label: 'Student Life' },
    { value: 'destinations', label: 'Destinations' },
    { value: 'news', label: 'News' },
    { value: 'success-stories', label: 'Success Stories' }
  ];

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.post = this.blogService.getPostBySlug(params['slug']);
      if (this.post) {
        this.renderedContent = this.renderMarkdown(this.post.content);
        this.relatedPosts = this.blogService.getRelatedPosts(this.post);
        document.title = `${this.post.title} | Abroado Journal`;
      }
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    const el = document.querySelector('.post-article') as HTMLElement;
    if (!el) return;
    const top = el.offsetTop;
    const height = el.offsetHeight;
    const scrolled = window.scrollY - top;
    this.readProgress = Math.min(100, Math.max(0, (scrolled / height) * 100));
  }

  renderMarkdown(content: string): string {
    return content
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|u|o|l])(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');
  }

  getCatLabel(cat: string): string {
    return this.categories.find(c => c.value === cat)?.label || cat;
  }

  share(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.post?.title || '');
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title} ${url}`
    };
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }
}
