import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private facebookDomain: string = "https://graph.facebook.com/v3.2/"

  private InstagramId: string = "17841450119482663"

  constructor(private http: HttpClient) { }

  getBasicInstagramInfo(access_token: string) {
    return this.http.get(this.facebookDomain+this.InstagramId+'?fields=biography,id,username,website,followers_count,follows_count,media_count,profile_picture_url&access_token='+access_token);
  }

}
