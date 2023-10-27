import { Component, Input } from '@angular/core';

type AvatarClass = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  @Input() avatarLetter = '';
  @Input() avatarClass: AvatarClass = 'small';
}
