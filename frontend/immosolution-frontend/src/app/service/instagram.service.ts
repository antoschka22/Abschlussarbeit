import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global/global';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private baseUri: string = this.globals.backendUri

  constructor(private http: HttpClient, private globals: Globals) { }

  getAllBoxes(id: string) {
    return this.http.get('https://tetris.armstrongconsulting.com/api/v1/boxes/' + id);
  }

}
