import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {


  accessToken: string = this.authService.getToken()

  constructor(private authService: AuthService) { }


  isLoggedIn(): boolean{
    let token = this.getToken();
    if(token == null){
      return false;
    }else{
      return true
    }
  }

  getToken(): string | null {
    let token = localStorage.getItem('facebookAuthToken');
    if(token == null){
      token = sessionStorage.getItem('facebookAuthToken');
    }
    return token
  }

  setTokenFacebook(authResponse: string, keepLogin: boolean){
    if(keepLogin){
      localStorage.setItem('facebookAuthToken', authResponse);
    }else{
      sessionStorage.setItem('facebookAuthToken', authResponse);
    }
  }

  logoutUser(): void {
    // console.log('Logout');
    localStorage.removeItem('facebookAuthToken');
    localStorage.removeItem('facebookAuthTokenEXPdate');
    sessionStorage.removeItem('facebookAuthToken');
  }


  getFB_ATExpirationDate(FacebookExpirationDateMS){
    let FacebookExpirationDate = new Date()
    
    FacebookExpirationDate.setUTCSeconds(FacebookExpirationDateMS);

    localStorage.setItem("facebookAuthTokenEXPdate", FacebookExpirationDate.toString().split(" ")[4]);
  }

  getATExpirationDate(){
    return this.authService.getTokenExpirationDate(this.accessToken).toString().split(" ")[4];
  }


}
