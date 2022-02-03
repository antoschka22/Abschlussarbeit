import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';
import { IntagramAuthService } from 'src/app/service/intagram-auth.service';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { UserService } from 'src/app/service/user.service';
import { ankuendigung } from 'src/models/ankuendigungen';

class token_class {
  constructor(
    public token: string) {
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  infos: any = ""

  showAnkuendigung: boolean

  constructor(private frontend: FrontendService,
              private instagramAuth: IntagramAuthService,
              private userService: UserService,
              private updateWebsiteService: UpdateWebsiteService) { }

  ngOnInit(): void {
    this.getInfos();

    //Luka ignoriere diesen Code
    this.refreshInstagramAccessToken();
    this.getAnkuendigungen();
  }

  getInfos(){
    this.frontend.getAllInfos().subscribe((data: any)=>{
      this.infos = data
      // console.log(data)
    })
  }


  //Luka ignoriere diesen Code
  refreshInstagramAccessToken(){
    let token: string
    this.userService.getUserInfos("admin").subscribe((data)=>{
      token = data['instagram_at']

      this.instagramAuth.refreshInstagramAccessToken(token).subscribe((data_token)=>{
        let model: token_class = new token_class (data_token['access_token']);
        this.userService.updateInstagramAccessToken("admin", model).subscribe((data)=>{
          // console.log("Access Token successfully updated, ",data_token)
        }, (error)=>{
          console.log("Error occured, "+error);
          
        })
      });
    })
  }

  getAnkuendigungen(){
    this.frontend.getAnkuendigungen().subscribe((data:ankuendigung)=>{
      let ankuendigung: boolean = data['switchankuendigung']
      
      this.showAnkuendigung = ankuendigung
      this.updateWebsiteService.setAnkuendigung(String(ankuendigung))
    })
  }

}
