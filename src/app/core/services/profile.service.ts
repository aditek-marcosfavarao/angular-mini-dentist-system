import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../@types/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  private readonly profilesUrl = '/api/profiles';

  public getProfiles() {
    return this.httpClient.get<Profile[]>(this.profilesUrl);
  }
}
