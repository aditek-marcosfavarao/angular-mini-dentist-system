import { Component } from '@angular/core';
import { Router } from '@angular/router';

enum Path {
  pathLogin = 'http://localhost:4200/login',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'angular-mini-dentist-system';

  navPath = this.router.url === Path.pathLogin;

  ngOnAfterInit() {
    console.log(this.navPath ?? 'num é bro');
  }
}
