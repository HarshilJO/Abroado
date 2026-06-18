import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  @Output() searchTermChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTermChange.emit(inputElement.value);
  }
}