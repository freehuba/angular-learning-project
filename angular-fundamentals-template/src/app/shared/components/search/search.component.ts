import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Search for courses...';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchValue: string = '';

  onSearch() {
    this.search.emit(this.searchValue);
    console.log(this.searchValue);
    this.searchValue = '';
  }

  onInputChange() {
    this.search.emit(''); 
  }
}
