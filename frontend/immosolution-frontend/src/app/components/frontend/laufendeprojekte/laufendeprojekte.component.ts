import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';
import { project } from 'src/models/project';

@Component({
  selector: 'app-laufendeprojekte',
  templateUrl: './laufendeprojekte.component.html',
  styleUrls: ['./laufendeprojekte.component.scss']
})
export class LaufendeprojekteComponent implements OnInit {

    // store the frontend Service under the name "frontendService"
    constructor(private frontendService: FrontendService) { }

  // variable for storing an array of all the projects
  projects: project[]

  ngOnInit(): void {
    //calling the function when the site is loaded
    this.getUndoneProjects();
  }

  getUndoneProjects(){
    /**
     * call the function in the frontend Service
     */
    this.frontendService.getUndoneProjects().subscribe((data: project[])=>{
      this.projects = data
    })
  }

}
