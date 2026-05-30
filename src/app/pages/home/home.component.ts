import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { MarqueeComponent } from './sections/marquee/marquee.component';
import { StatsComponent } from './sections/stats/stats.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { DestinationsComponent } from './sections/destinations/destinations.component';
import { ProcessComponent } from './sections/process/process.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { CtaComponent } from './sections/cta/cta.component';
import { AssessmentComponent } from './sections/assessment/assessment.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent, MarqueeComponent, StatsComponent, AboutComponent,
    ServicesComponent, DestinationsComponent, ProcessComponent,
    TestimonialsComponent, AssessmentComponent, CtaComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
