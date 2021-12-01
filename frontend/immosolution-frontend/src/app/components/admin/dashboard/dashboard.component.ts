import { Component, OnInit } from '@angular/core';
import { InstagramService } from 'src/app/service/instagram.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private instaService: InstagramService) { }

  ngOnInit(): void {
  }

  mainStyle: number = 280
  toggleMain(answer: boolean){
    if(answer){
      this.mainStyle = 0
      console.log(this.mainStyle)
    }else{
      this.mainStyle = 280
      console.log(this.mainStyle)
    }
  }
}
