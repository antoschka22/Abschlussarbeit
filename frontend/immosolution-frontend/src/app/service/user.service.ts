import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/global';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUri: string = this.globals.backendUri
  
  constructor(private http: HttpClient, private globals: Globals) { }

  getUserInfos(username: string){
    return this.http.get(this.baseUri + "/user/" + username);
  }

  hashIt(password: string){
    const salt = bcrypt.genSaltSync(10);
    const hashedPW = bcrypt.hashSync(password, salt);
    return hashedPW
  }

  compareIt(password: string, hashedPassword): boolean{
    return bcrypt.compareSync(password, hashedPassword)
  }
}
