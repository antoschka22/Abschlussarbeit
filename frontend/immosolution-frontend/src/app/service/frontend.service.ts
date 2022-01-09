import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/global';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  private baseUri: string = this.globals.backendUri

  constructor(private http: HttpClient,
              private globals: Globals) { }

  getAllInfos(){
    return this.http.get(this.baseUri + '/infos/all');
  }

  getgruendung(){
    return this.http.get(this.baseUri + '/infos/gruendung');
  }

  getprivatkunden(){
    return this.http.get(this.baseUri + '/infos/privatkunden');
  }
  
  getprojekte(){
    return this.http.get(this.baseUri + '/infos/projekte');
  }

  getteam(){
    return this.http.get(this.baseUri + '/infos/team');
  }

  getueberUns(){
    return this.http.get(this.baseUri + '/infos/ueberUns');
  }

  getUndoneProjects(){
    return this.http.get(this.baseUri + '/projectsInWork');
  }

  getDoneProjects(){
    return this.http.get(this.baseUri + '/doneProjects');
  }

  getAnkuendigungen(){
    return this.http.get(this.baseUri + '/infos/ankuendigung');
  }
}
