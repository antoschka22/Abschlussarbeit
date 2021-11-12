import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(private http: HttpClient) { }

  getAllBoxes(id: string) {
    return this.http.get('https://tetris.armstrongconsulting.com/api/v1/boxes/' + id);
  }

}
