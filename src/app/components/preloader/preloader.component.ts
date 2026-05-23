import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent implements OnInit {
  hidden = false;

  ngOnInit() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hidden = true;
        document.body.style.overflow = '';
      }, 1800);
    });
    document.body.style.overflow = 'hidden';
  }
}
