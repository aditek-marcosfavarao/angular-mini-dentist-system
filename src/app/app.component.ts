import { Component } from '@angular/core';
import { DatabaseMockService } from './core/services/database.mock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private databaseMockService: DatabaseMockService) {
    this.databaseMockService.deployMirageJsServer();
  }
}
