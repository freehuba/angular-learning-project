import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: string;

  @Output() buttonClick = new EventEmitter<void>();

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onClick(): void {
    this.buttonClick.emit();
  }

  get icon(): IconProp | undefined {
    return this.iconName ? this.iconName as IconProp : undefined;
  }
  
}
