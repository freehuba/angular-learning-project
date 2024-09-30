import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() title: string = '';
  @Input() text: string = '';
  @Output() textChange = new EventEmitter<string>();

}
