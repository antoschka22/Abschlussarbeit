import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IntagramAuthService {

  accessToken: string = this.authService.getToken()

  constructor(private authService: AuthService,
              private http: HttpClient) { }

  instagramDomain: string = 'https://graph.instagram.com/refresh_access_token'

  isLoggedIn(): boolean{
    let token = this.getToken();
    if(token == null){
      return false;
    }else{
      return true
    }
  }

  getToken(): string | null {
    let token = localStorage.getItem('instagramAuthToken');
    return token
  }

  setTokenInstagram(authResponse: string, keepLogin: boolean){
    if(keepLogin){
      localStorage.setItem('instagramAuthToken', authResponse);
    }else{
      sessionStorage.setItem('instagramAuthToken', authResponse);
    }
  }

  logoutUser(): void {
    // console.log('Logout');
    localStorage.removeItem('instagramAuthToken');
    sessionStorage.removeItem('instagramAuthToken');
  }

  refreshInstagramAccessToken(token: string){
    return this.http.get(this.instagramDomain+'?grant_type=ig_refresh_token&access_token='+token);
  }
}
