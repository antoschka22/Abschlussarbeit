import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  facebookDomain: string = "https://graph.facebook.com"

  constructor(private http: HttpClient) { }

  getUserInfos(accessToken: string){
    return this.http.get(this.facebookDomain+"/me?fields=id,name,email,picture,location,birthday&access_token="+accessToken)
  }

  getImagesWithInfo(accessToken: string){
    return this.http.get(this.facebookDomain+"/v12.0/me/photos/uploaded?fields=link,source,comments.summary(true),likes.summary(true)&access_token="+accessToken)
  }

}
