import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ankuendigung } from 'src/global/ankuendigungen';
import { Globals } from 'src/global/global';

@Injectable({
  providedIn: 'root'
})
export class UpdateWebsiteService {

  private baseUri: string = this.globals.backendUri

  constructor(private http: HttpClient,
              private globals: Globals) { }

  setAnkuendigung(ankuendigungSwitch: string){
    localStorage.setItem('switchAnkuendigung', ankuendigungSwitch);
  }

  getAnkuendigung(): string | null {
    return localStorage.getItem('switchAnkuendigung');
  }

  updateAnkuendigung(ankuendigung: ankuendigung){
    return this.http.put(this.baseUri + '/infos/ankuendigung', ankuendigung);
  }

}
