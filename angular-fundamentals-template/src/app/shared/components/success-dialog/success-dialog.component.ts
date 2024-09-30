import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeDialog() {
    this.close.emit(); 
    this.router.navigate(['/courses']); 
  }
}
