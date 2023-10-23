import { Component, EventEmitter, Output, Input } from '@angular/core';

type ButtonColor = 'primary' | 'danger' | 'neutral';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() modalEvent = new EventEmitter<string>();
  @Input() customButtonName = '';
  @Input() customButtonTitle = '';
  @Input() customButtonColor: ButtonColor = 'neutral';

  closeModal() {
    this.modalEvent.emit();
  }
  confirmAction(event: { stopPropagation: () => void }) {
    event.stopPropagation();
  }
}
