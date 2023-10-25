import { Injectable } from '@angular/core';
import { Profile } from '../@types/profile';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private profile?: Profile;

  setPaciente(profile: Profile) {
    this.profile = profile;
  }
  getPaciente() {
    return this.profile;
  }
}
