import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  handleLeftClick() {
    return console.log('click esquerda');
  }
  handleRightClick() {
    return console.log('click esquerda');
  }
}
