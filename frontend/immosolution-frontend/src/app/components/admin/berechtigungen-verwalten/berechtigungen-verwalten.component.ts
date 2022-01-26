import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { FacebookAuthService } from 'src/app/service/facebook-auth.service';
import { UserService } from 'src/app/service/user.service';
import { AuthRequest } from 'src/models/AuthRequest';
import Swal from 'sweetalert2';

class loginModel implements AuthRequest{
  constructor(
    public username: string,
    public password: string
  ){

  }
}

@Component({
  selector: 'app-berechtigungen-verwalten',
  templateUrl: './berechtigungen-verwalten.component.html',
  styleUrls: ['./berechtigungen-verwalten.component.scss']
})
export class BerechtigungenVerwaltenComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private userService: UserService,
              private facebookService: FacebookAuthService) { }

  expirationDate: any
  @Input() FacebookExpirationDate: any

  userInfo: any = ""
  loginModel: loginModel


  ngOnInit(): void {
    this.getUser();
    this.get_ATExpirationDate();
    this.checkFacebookAT_EXPdate();
  }

  getUser(){
    this.userService.getUserInfos(this.authService.getUsernameFromToken()).subscribe((data)=>{
      this.userInfo = data
    })
  }

  get_ATExpirationDate(){
    this.expirationDate = this.facebookService.getATExpirationDate();
    // console.log(this.expirationDate)
  }
  
  checkFacebookAT_EXPdate(){
    if(localStorage.getItem("facebookAuthTokenEXPdate")){
      this.FacebookExpirationDate = localStorage.getItem("facebookAuthTokenEXPdate")
    }
  }

  
  AddAccessTokenTime(){
    this.loginModel = new loginModel(this.userInfo.username, this.userInfo.password)

    Swal.fire({
      title: 'Wollen Sie wirklich die Zeitdauer des Zugriffsschlüssels verlängern?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, verlängern',
      cancelButtonText: 'Nein',
    }).then((result) => {

      if (result.isConfirmed) {

        this.authService.loginUser(this.loginModel, true).subscribe((data)=>{
          this.toastr.success("Der Zugriffsschlüssel wurde verlängert", 'Success', {
            timeOut: 1500,
          });
          setTimeout(()=>{
            window.location.reload()
          }, 1000);
        })

      } else if (result.isDismissed) {

      }
    })
  }

  logOut(){
    Swal.fire({
      title: 'Wollen Sie sich wirklich ausloggen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, ausloggen',
      cancelButtonText: 'Nein, eingeloggt bleiben',
    }).then((result) => {

      if (result.isConfirmed) {

        this.authService.logoutUser();
        this.router.navigate(['/']);
        this.toastr.success('log out succeded', 'Successfully!');

      } else if (result.isDismissed) {

      }
    })
  }

}
