import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss'
})
export class ProcessComponent {
  steps = [
    { title: 'Free Consultation', desc: 'Book your free consultation with our expert counselors to discuss your goals.' },
    { title: 'University Selection', desc: 'We help shortlist the best universities and programs that match your profile.' },
    { title: 'Documentation', desc: 'Complete documentation support including application, SOP, and verification.' },
    { title: 'Visa Success', desc: 'Expert visa guidance with our 98% success rate to ensure smooth approval.' },
    { title: 'Fly to Your Dreams', desc: 'Pre-departure briefing, travel planning, and you\'re ready to go!' }
  ];
}
