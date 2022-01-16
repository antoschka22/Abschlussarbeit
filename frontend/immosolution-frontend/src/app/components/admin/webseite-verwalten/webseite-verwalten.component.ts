import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';
import { gruendung } from 'src/models/gruendung';
import { privatkunden } from 'src/models/privatkunden';
import { projekte } from 'src/models/projekte';
import { team } from 'src/models/team';
import { ueberUns } from 'src/models/ueberUns';

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
  ueberUnsImage: string

  teamText: string
  teamImage: string

  projekteText: string
  projekteBild: string

  ngOnInit(): void {
  }

  ueberUns(){
    this.frontendService.getueberUns().subscribe((data: ueberUns)=>{
      this.ueberUnsText = data['angebot']
      this.ueberUnsImage = data['ueberuns_image']

      this.frontendService.getprivatkunden().subscribe((data: privatkunden)=>{
        this.privatkundenText = data['privatkunden']

        this.frontendService.getgruendung().subscribe((data: gruendung)=>{
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

  team(){
    this.frontendService.getteam().subscribe((data: team)=>{
      this.teamText = data['mitarbeiter']
      this.teamImage = data['team_image']
    }, (error)=>{
      console.log(error.error)
    })
  }

  projekte(){
    this.frontendService.getprojekte().subscribe((data: projekte)=>{
      this.projekteText = data['referenzprojekte']
      this.projekteBild = data['projekte_image']
    })
  }


}
