import { Component, OnInit } from '@angular/core';
import { InstagramService } from 'src/app/service/instagram.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private instagramService: InstagramService) { }

  ngOnInit(): void {
    this.testRequest()
  }

  boxes: any
  id: string = 'dbb97db0-2366-4f87-a31b-2364e2ba624b'

  testRequest(){
    return this.instagramService.getAllBoxes(this.id).subscribe((data: any)=>{
      this.boxes = data
      console.log(data)
    })
  }

}
