import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthLogin } from '../@types/auth';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private isLoggedIn = false;
  private readonly profilesUrl = '/api/login';

  public login(credentials: AuthLogin) {
    return this.httpClient.post<AuthLogin>(this.profilesUrl, credentials);
  }

  public setIsLoggedIn() {
    this.isLoggedIn = true;
    this.localStorageService.setData('systemLogin', 'true');
  }

  public setIsLoggedOut() {
    this.isLoggedIn = false;
    this.localStorageService.setData('systemLogin', 'false');
  }

  public getIsUserLoggedIn(): boolean {
    const isUserLogged = this.localStorageService.getData('systemLoggin');
    const parsedData = JSON.parse(isUserLogged || '{}');

    // return parsedData;
    return this.isLoggedIn;
  }
}
