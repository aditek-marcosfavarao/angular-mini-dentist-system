import { Injectable } from '@angular/core';
import { Profile } from '../@types/profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class perfilsServices {
  constructor(private http: HttpClient) {}

  private profiles: Profile[] = [];

  getProfile() {
    console.log('fetching profiles...');
    return this.profiles;
  }

  setProfile(profile: Profile) {
    this.profiles.push(profile);
  }
}
