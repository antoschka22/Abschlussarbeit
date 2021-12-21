import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  infos: any = ""

  constructor(private frontend: FrontendService) { }

  ngOnInit(): void {
    this.getInfos();
  }

  getInfos(){
    this.frontend.getAllInfos().subscribe((data: any)=>{
      this.infos = data
      // console.log(data)
    })
  }

}
