import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../@types/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  private readonly profilesUrl = '/api/profiles';

  public fetchProfiles() {
    return this.httpClient.get<Profile[]>(this.profilesUrl);
  }

  public fetchProfile(profileId: string) {
    return this.httpClient.get<Profile>(this.profilesUrl + '/' + profileId);
  }
}
