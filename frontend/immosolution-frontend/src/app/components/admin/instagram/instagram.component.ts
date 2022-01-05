import { Component, OnInit } from '@angular/core';
import { InstagramService } from 'src/app/service/instagram.service';
import { FacebookAuthService } from 'src/app/service/facebook-auth.service';
import { instagramInfos } from 'src/global/instagramInfos'
import { IntagramAuthService } from 'src/app/service/intagram-auth.service';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {

  accessToken: string = this.FacebookAuthService.getToken()
  infos: instagramInfos

  constructor(private instagramService: InstagramService,
              private FacebookAuthService: FacebookAuthService,
              private instagramAuthService: IntagramAuthService) { }

  ngOnInit(): void {
    this.getInstagramInfos()
  }

  getInstagramInfos(){
    this.instagramService.getBasicInstagramInfo(this.accessToken).subscribe((data: instagramInfos)=>{
      this.infos = data
      // console.log(data)
    },
    (error)=>{
      this.instagramAuthService.logoutUser()
      window.location.reload()
      console.log(error.error)
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
