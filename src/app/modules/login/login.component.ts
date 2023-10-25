import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  showPassword = false;
  inputType: Input = 'password';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  fieldControl = this.loginForm.controls;

  iconPath: IconPath = 'eyeClose';
  iconImage = ICON_PATH[this.iconPath];

  handleChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';

    this.iconPath = this.showPassword ? 'eyeOpen' : 'eyeClose';
    this.iconImage = ICON_PATH[this.iconPath];
  }

  handleLogin() {
    if (!this.loginForm.valid) return;
    // localStorage.setItem('id', JSON.stringify(0));
    this.router.navigate(['dashboard']);
  }
}
