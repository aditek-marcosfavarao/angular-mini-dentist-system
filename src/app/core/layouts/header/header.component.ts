import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isModalVisible = false;
  lastLogin = new Date(); // ! substituir por dados vindos da fake-api
  readonly dateFormatted = {
    //isso tirou meu sono nos ultimos dias
    simple: "dd'/'MM'/'yyyy",
    complete: "dd 'de' MMMM 'de' yyyy",
  };
  constructor(private router: Router) {}
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
    this.router.navigate(['login']);
  }
}
