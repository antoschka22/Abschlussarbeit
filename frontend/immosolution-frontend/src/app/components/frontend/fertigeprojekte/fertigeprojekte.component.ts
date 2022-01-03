import { Component, OnInit } from '@angular/core';
import { FrontendService } from 'src/app/service/frontend.service';
import { project } from 'src/global/project';

@Component({
  selector: 'app-fertigeprojekte',
  templateUrl: './fertigeprojekte.component.html',
  styleUrls: ['./fertigeprojekte.component.scss']
})
export class FertigeprojekteComponent implements OnInit {

  // store the frontend Service under the name "frontendService"
  constructor(private frontendService: FrontendService) { }

  // variable for storing an array of all the projects
  projects: project[]

  ngOnInit(): void {
    //calling the function when the site is loaded
    this.getDoneProjects();
  }

  getDoneProjects(){
    /**
     * call the function in the frontend Service
     */
    this.frontendService.getDoneProjects().subscribe((data: project[])=>{
      this.projects = data
    })
  }

}
