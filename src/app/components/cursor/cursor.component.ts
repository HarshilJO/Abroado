import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.scss'
})
export class CursorComponent implements OnInit {
  cursorX = 0; cursorY = 0;
  followerX = 0; followerY = 0;
  mouseX = 0; mouseY = 0;
  isHover = false;

  ngOnInit() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY; });
    this.animate();
    document.addEventListener('mouseover', (e) => {
      const el = e.target as HTMLElement;
      this.isHover = !!el.closest('a, button, input, textarea, select, .visa-card, .destination-card, .blog-card');
    });
  }

  animate() {
    this.cursorX += (this.mouseX - this.cursorX) * 0.2;
    this.cursorY += (this.mouseY - this.cursorY) * 0.2;
    this.followerX += (this.mouseX - this.followerX) * 0.1;
    this.followerY += (this.mouseY - this.followerY) * 0.1;
    requestAnimationFrame(() => this.animate());
  }
}
