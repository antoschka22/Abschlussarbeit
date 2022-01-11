import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ankuendigung } from 'src/global/ankuendigungen';
import { Globals } from 'src/global/global';
import { gruendung } from 'src/global/gruendung';
import { privatkunden } from 'src/global/privatkunden';
import { ueberUns } from 'src/global/ueberUns';

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

  getSwitchAnkuendigung(): string | null {
    return localStorage.getItem('switchAnkuendigung');
  }

  updateAnkuendigung(ankuendigung: ankuendigung){
    return this.http.put(this.baseUri + '/infos/ankuendigung', ankuendigung);
  }

  updateUeberUns(ueberUns: ueberUns){
    return this.http.put(this.baseUri + '/infos/ueberUns', ueberUns);
  }

  updatePrivatkunden(privatkunden: privatkunden){
    return this.http.put(this.baseUri + '/infos/privatkunden', privatkunden);
  }

  updateGruendung(gruendung: gruendung){
    return this.http.put(this.baseUri + '/infos/gruendung', gruendung);
  }

}
