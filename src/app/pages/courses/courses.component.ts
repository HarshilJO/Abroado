import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchContainer } from '../../utils/modules/course-search/components/search-container/search-container';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterModule, SearchContainer],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {}
