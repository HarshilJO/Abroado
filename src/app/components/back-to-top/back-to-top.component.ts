import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
  visible = false;

  @HostListener('window:scroll')
  onScroll() { this.visible = window.scrollY > 500; }

  scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
