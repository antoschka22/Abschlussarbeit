import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private facebookDomain: string = "https://graph.facebook.com/v3.2/"

  private instagramDomain: string = "https://graph.instagram.com/"

  private InstagramId: string = "17841450119482663"

  constructor(private http: HttpClient) { }

  getBasicInstagramInfo(access_token: string) {
    return this.http.get(this.facebookDomain + this.InstagramId + '?fields=biography,id,username,website,followers_count,follows_count,media_count,profile_picture_url&access_token='+access_token);
  }

  getInstagramMedias(access_token: string){
    return this.http.get(this.instagramDomain + this.InstagramId + "/media?fields=id,caption,media_url,thumbnail_url&access_token="+access_token);
  }
}
