import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/global/global';
import * as bcrypt from 'bcryptjs';
import { user } from 'src/models/user';


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

  compareIt(password: string, hashedPassword: string): boolean{
    return bcrypt.compareSync(password, hashedPassword)
  }

  updateInstagramAccessToken(username: string, token){
    return this.http.put(this.baseUri + "/user/" + username, token)
  }

  updateUser(user: user, username: string){
    return this.http.put(this.baseUri + '/user/update/' + username, user);
  }

}
