import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacebookAuthService } from 'src/app/service/facebook-auth.service';
import { IntagramAuthService } from 'src/app/service/intagram-auth.service';
import { UserService } from 'src/app/service/user.service';


declare var FB: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  FacebookExpirationDate: any


  constructor(private toastr: ToastrService,
              private facebookService: FacebookAuthService,
              private instagramAuth: IntagramAuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '920691181906595',
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if(fjs.parentNode){
        fjs.parentNode.insertBefore(js, fjs);
      }
  }(document, 'script', 'facebook-jssdk')); 

  this.setTokenInstagram()
  }

  submitLogin(){
    // console.log("submit login to facebook");
    FB.login((response: any)=>{
          if (response.authResponse){
            this.toastr.success('login successful', 'Success!', {
              timeOut: 1500,
            });

            this.facebookService.setTokenFacebook(response.authResponse.accessToken, true);
            
            this.getFB_ATExpirationDate(response.authResponse.expiresIn);

            
            // window.location.reload()
            // console.log(response.authResponse)
          }else{
            this.toastr.error('Login error', 'Error', {
              timeOut: 3000,
            });
         }
      }, { auth_type: 'reauthorize' });
  }

  getFB_ATExpirationDate(FacebookExpirationDateMS: number){
    this.facebookService.getFB_ATExpirationDate(FacebookExpirationDateMS)
    this.FacebookExpirationDate = localStorage.getItem("facebookAuthTokenEXPdate")
  }

  setTokenInstagram(){
    let token 
    this.userService.getUserInfos("admin").subscribe((data)=>{
      token = data['instagram_at']
    })
    setTimeout(() => {
      this.instagramAuth.setTokenInstagram(token, true)
    }, 700);
  }

  
  mainStyle: number = 280
  toggleMain(answer: boolean){
    if(answer){
      this.mainStyle = 0
      // console.log(this.mainStyle)
    }else{
      this.mainStyle = 280
      // console.log(this.mainStyle)
    }
  }
}
