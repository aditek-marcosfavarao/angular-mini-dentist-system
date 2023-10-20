import { Component } from '@angular/core';

type IconPath = {
  eyeOpen: string;
  eyeClose: string;
};

type Input = 'text' | 'password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword = false;
  iconPath: IconPath = {
    eyeOpen: './assets/icon-eye.svg',
    eyeClose: './assets/icon-eye-slash.svg',
  };
  iconImage = this.iconPath.eyeClose;
  inputType: Input = 'password';

  handleChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.iconImage = this.showPassword
      ? this.iconPath.eyeOpen
      : this.iconPath.eyeClose;
    this.inputType = this.showPassword ? 'text' : 'password';
  }

  handleLogin() {
    console.log('login');
  }
}
