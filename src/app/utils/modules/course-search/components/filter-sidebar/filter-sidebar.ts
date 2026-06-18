import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-sidebar',
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebar {
  @Input() initialCountry: string = '';
  @Input() universities: string[] = [];
  @Output() filterChange = new EventEmitter<{ key: string, value: string }>();
  @Output() resetFilters = new EventEmitter<void>();

  onFilterChange(key: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterChange.emit({ key, value: selectElement.value });
  }

  onReset(): void {
    const selects = document.querySelectorAll('app-filter-sidebar select');
    selects.forEach((s: any) => s.value = '');
    this.filterChange.emit({ key: 'country', value: '' });
    this.filterChange.emit({ key: 'level', value: '' });
    this.filterChange.emit({ key: 'university', value: '' });
    this.resetFilters.emit();
  }
}
