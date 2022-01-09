import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from 'src/global/global';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private globals: Globals,
              private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authUri = this.globals.backendUri + '/login';
    
    if(req.url === authUri || !this.authService.isLoggedIn()){
      return next.handle(req);
    }

    let token:string = localStorage.authToken
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(authReq)
  }
}
