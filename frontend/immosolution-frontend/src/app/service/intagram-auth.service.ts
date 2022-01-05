import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IntagramAuthService {

  accessToken: string = this.authService.getToken()

  constructor(private authService: AuthService,
              private http: HttpClient,
              private userService: UserService) { }


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
    localStorage.removeItem('facebookAuthTokenEXPdate');
    sessionStorage.removeItem('instagramAuthToken');
  }


  setInstagram_EXPDate(EXPinSeconds: number){
    let FacebookExpirationDateMS
    let FacebookExpirationDate = new Date()
    
    FacebookExpirationDateMS = localStorage.getItem('facebookAuthTokenEXPdate');
    FacebookExpirationDate.setUTCSeconds(FacebookExpirationDateMS);

    localStorage.setItem("facebookAuthTokenEXPdate", FacebookExpirationDate.toString().split(" ")[4]);
  }

  refreshInstagramAccessToken(token: string){
    return this.http.get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token='+token);
  }
}
