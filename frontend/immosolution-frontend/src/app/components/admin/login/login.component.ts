import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/global/user';
import { AuthRequest } from 'src/models/AuthRequest';

class loginModel implements AuthRequest{
  constructor(
    public username: string,
    public password: string
  ){

  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form:any

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  loginModel: loginModel = new loginModel("", "")
  onSubmit(){
    if(this.form.valid){
      this.userService.getUserInfos(this.loginModel.username).subscribe((data: user) =>{
        if(!data){
          this.toastr.error("Wrong Username", 'Login error', {
            timeOut: 3000,
          });
          return false
        }

        if(this.userService.compareIt(this.loginModel.password, data.password)){
          this.authService.loginUser(this.loginModel, true).subscribe(data=>{
            this.toastr.success("Right credentials", 'Success', {
              timeOut: 1500,
            });
            this.router.navigate(['/admin']);
          },
          (error) => {
            this.toastr.error(error.error, 'Login error', {
              timeOut: 2000,
            });
          })
          return true
        }else{
          this.toastr.error("Wrong password", 'Login error', {
            timeOut: 2000,
          });
          return false
        }
      }, (error)=>{
        this.toastr.error(error.error, 'Login error', {
          timeOut: 2000,
        });
      })
    }
  }
}
