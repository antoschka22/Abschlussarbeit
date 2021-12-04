import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InstagramService } from 'src/app/service/instagram.service';

declare var FB: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private instaService: InstagramService,
              private toastr: ToastrService) { }

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
  }

  submitLogin(){
    // console.log("submit login to facebook");
    // FB.login();
    FB.login((response: any)=>
        {
          if (response.authResponse)
          {
            console.log('submitLogin',response);
            this.toastr.success('login successful', 'Success!');
          }
           else
           {
            this.toastr.error('Login error', 'Error', {
              timeOut: 3000,
            });
         }
      });
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
