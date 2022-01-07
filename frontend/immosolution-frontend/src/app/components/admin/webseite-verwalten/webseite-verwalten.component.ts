import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';

@Component({
  selector: 'app-webseite-verwalten',
  templateUrl: './webseite-verwalten.component.html',
  styleUrls: ['./webseite-verwalten.component.scss']
})
export class WebseiteVerwaltenComponent implements OnInit {

  constructor(private frontendService: FrontendService) { }

  ueberUnsText: string
  privatkundenText: string
  gruendungText: string

  ngOnInit(): void {
  }

  ankuendigungFetch(){

  }

  ueberUns(){
    this.frontendService.getueberUns().subscribe((data)=>{
      this.ueberUnsText = data['angebot']

      this.frontendService.getprivatkunden().subscribe((data)=>{
        this.privatkundenText = data['privatkunden']

        this.frontendService.getgruendung().subscribe((data)=>{
          this.gruendungText = data['gruedung']

        },(error)=>{
          console.log(error.error)
        })

      },(error)=>{
        console.log(error.error)
      })

    },(error)=>{
      console.log(error.error)
    })
  }


}
