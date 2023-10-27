import { Component, EventEmitter, Output, Input } from '@angular/core';

type ButtonColor = 'primary' | 'danger' | 'neutral';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() modalEventClose = new EventEmitter<string>();
  @Output() modalCustomEvent = new EventEmitter<string>();
  @Input() customButtonName = '';
  @Input() customButtonTitle = '';
  @Input() customButtonColor: ButtonColor = 'neutral';

  closeModal() {
    this.modalEventClose.emit();
  }
  buttonCustomModal() {
    this.modalCustomEvent.emit();
  }
}
