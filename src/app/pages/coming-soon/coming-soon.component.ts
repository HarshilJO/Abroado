import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  country: string = 'this destination';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['country']) {
        this.country = params['country'];
      }
    });
  }
}
