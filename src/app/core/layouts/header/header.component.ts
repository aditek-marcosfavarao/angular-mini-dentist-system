import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isModalVisible = false;
  lastLogin = new Date(); // ! substituir por dados vindos da fake-api
  readonly dateFormatted = {
    //isso tirou meu sono nos ultimos dias
    simple: "dd'/'MM'/'yyyy",
    complete: "dd 'de' MMMM 'de' yyyy",
  };
  goToDashboardPage() {
    this.router.navigate(['dashboard']);
  }
  handleOpenModal() {
    this.isModalVisible = true;
  }
  onCloseModal() {
    this.isModalVisible = false;
  }
  onLogoutUser() {
    this.onCloseModal();
    this.authService.setIsLoggedOut();
    this.router.navigate(['login']);
  }
}
