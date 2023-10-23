import { Component } from '@angular/core';

const ICON_PATH = {
  eyeOpen: './assets/icon-eye.svg',
  eyeClose: './assets/icon-eye-slash.svg',
} as const;
type IconPath = keyof typeof ICON_PATH;

type Input = 'text' | 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword = false;
  inputType: Input = 'password';

  iconPath: IconPath = 'eyeClose';
  iconImage = ICON_PATH[this.iconPath];

  handleChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';

    this.iconPath = this.showPassword ? 'eyeOpen' : 'eyeClose';
    this.iconImage = ICON_PATH[this.iconPath];
  }

  handleLogin() {
    console.log('login');
  }
}
