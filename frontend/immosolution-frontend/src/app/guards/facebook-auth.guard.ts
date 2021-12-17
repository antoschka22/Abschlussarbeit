import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { FacebookAuthService } from '../service/facebook-auth.service';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class FacebookAuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private authGuard: AuthGuard,
              private facebookAuth: FacebookAuthService,
              private toastr: ToastrService,
              private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    if(this.authService.isLoggedIn() && this.facebookAuth.isLoggedIn()){
      if(this.authGuard.checkPermissions(route)){
        return true;
      }else if(!this.authGuard.checkPermissions(route)){
        this.router.navigate(['/login'])
        return false
      } else {
        this.router.navigate(['/admin'])
        this.toastr.error("You have not logged in with Facebook", "Facebook Login error", {
          timeOut: 4000
        });
        return false
      }
    }else if(!this.facebookAuth.isLoggedIn()){
      this.toastr.error("You need to login with facebook", "Facebook login error", {
        timeOut: 4000
      });
      return false
    }else{
      // console.log(this.authService.isLoggedIn(), this.facebookAuth.isLoggedIn())
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
