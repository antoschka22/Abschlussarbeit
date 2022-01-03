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

  getUndoneProjects(){
    return this.http.get(this.baseUri + '/projectsInWork');
  }

  getDoneProjects(){
    return this.http.get(this.baseUri + '/doneProjects');
  }
}
