import { Component, OnInit } from '@angular/core';
import { FacebookAuthService } from 'src/app/service/facebook-auth.service';
import { FacebookService } from 'src/app/service/facebook.service';
import { facebookImage } from 'src/models/facebookImage';

declare var FB: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

  facebookToken: string
  facebookUserInfo: any
  facebookInfoPic: facebookImage[]

  constructor(private facebookService: FacebookService,
              private facebookAuthService: FacebookAuthService) { }

  ngOnInit(): void {
    this.getFacebookUserInfo();
  }

  getFacebookUserInfo(){
    this.facebookToken = this.facebookAuthService.getToken()
    this.facebookService.getUserInfos(this.facebookToken).subscribe((data) =>{
      this.facebookUserInfo = data
      // console.log(this.facebookUserInfo)
    },
    (error)=>{
      this.facebookAuthService.logoutUser()
      window.location.reload()
      console.log(error.error)
    })

    this.facebookService.getImagesWithInfo(this.facebookToken).subscribe((data: facebookImage[])=>{
      this.facebookInfoPic = data
      // console.log(this.facebookInfoPic['data'])
    })
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
