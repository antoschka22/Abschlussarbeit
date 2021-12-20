import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private http: HttpClient) { }

  getUserInfos(accessToken: string){
    return this.http.get("https://graph.facebook.com/me?fields=id,name,email,picture,location,birthday&access_token="+accessToken)
  }


}
