import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthLogin } from 'src/app/core/@types/auth';

import { AuthService } from 'src/app/core/services/auth.service';
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
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  @ViewChild('inputLoginRef')
  inputRef = {} as ElementRef<HTMLInputElement>;

  showPassword = false;
  inputType: Input = 'password';
  iconPath: IconPath = 'eyeClose';
  iconImage = ICON_PATH[this.iconPath];

  elementTouched = {
    inputEmail: false,
    inputPassword: false,
  };

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  fieldControl = this.loginForm.controls;

  onFormSubmit() {
    if (!this.loginForm.valid) {
      this.elementTouched.inputEmail = true;
      this.elementTouched.inputPassword = true;
      return;
    }

    const payload: AuthLogin = {
      email: this.loginForm.controls.email.value ?? '',
      password: this.loginForm.controls.password.value ?? '',
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.setIsLoggedIn();
      },
      error: (error) => console.error('login error: ' + error.message),
      complete: () => this.router.navigate(['dashboard']),
    });
  }

  onInputBlur(
    blurElement: HTMLInputElement,
    inputName: keyof typeof this.elementTouched
  ) {
    const hasInputBeenTouched = blurElement.className.includes('ng-dirty');
    this.elementTouched[inputName] = hasInputBeenTouched;
  }

  handleChangePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.inputType = this.showPassword ? 'text' : 'password';

    this.iconPath = this.showPassword ? 'eyeOpen' : 'eyeClose';
    this.iconImage = ICON_PATH[this.iconPath];
  }
}
