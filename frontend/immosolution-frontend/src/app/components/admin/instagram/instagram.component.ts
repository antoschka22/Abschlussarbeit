import { Component, OnInit } from '@angular/core';
import { InstagramService } from 'src/app/service/instagram.service';
import { FacebookAuthService } from 'src/app/service/facebook-auth.service';
import { instagramInfos } from 'src/models/instagramInfos'
import { IntagramAuthService } from 'src/app/service/intagram-auth.service';
import { instagramMedia } from 'src/models/instagramMedia';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss']
})
export class InstagramComponent implements OnInit {

  FBaccessToken: string = this.FacebookAuthService.getToken()
  INaccessToken: string = this.instagramAuthService.getToken()
  infos: instagramInfos
  media: instagramMedia

  constructor(private instagramService: InstagramService,
              private FacebookAuthService: FacebookAuthService,
              private instagramAuthService: IntagramAuthService) { }

  ngOnInit(): void {
    this.getInstagramInfos()
  }

  getInstagramInfos(){
    this.instagramService.getBasicInstagramInfo(this.FBaccessToken).subscribe((data: instagramInfos)=>{
      this.infos = data
      // console.log(data)
    },
    (error)=>{
      this.instagramAuthService.logoutUser()
      window.location.reload()
      console.log(error.error)
    })

    this.instagramService.getInstagramMedias(this.INaccessToken).subscribe((data: instagramMedia)=>{
      this.media = data
      console.log(data)
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
