import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthService {


  constructor() { }


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


}
