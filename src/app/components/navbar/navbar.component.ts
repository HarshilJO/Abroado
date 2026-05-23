import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  mobileOpen = false;
  activeSection = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveSection();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 100;
    this.updateActiveSection();
    if (this.mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  updateActiveSection() {
    const sections = ['home', 'about', 'services', 'destinations', 'testimonials', 'contact'];
    const scrollY = window.scrollY + 120;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        this.activeSection = id;
        break;
      }
    }
  }

  scrollTo(id: string) {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }, 100);
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    document.body.classList.toggle('menu-open', this.mobileOpen);
  }

  closeMobile() {
    this.mobileOpen = false;
    document.body.classList.remove('menu-open');
  }
}
