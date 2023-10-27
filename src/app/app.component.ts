import { Component } from '@angular/core';
import { DatabaseMockService } from './core/services/database.mock.service';
import { ProfileService } from './core/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private databaseMockService: DatabaseMockService,
    private profileService: ProfileService
  ) {
    this.databaseMockService.deployMirageJsServer();
    this.getProfiles();
  }

  private getProfiles() {
    this.profileService.getProfiles().subscribe({
      next: (response) => console.log(response),
      error: (error) =>
        console.error('Could not retrieve profiles 😢: ', error),
    });
  }
}
