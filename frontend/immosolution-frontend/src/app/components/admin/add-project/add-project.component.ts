import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { project } from 'src/models/project';

class addProject implements project {
  constructor(
    public foldername: number,
    public herzeigeprojekte: boolean,
    public projektname: string) {
    }
  }

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projectModel: addProject

  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  onSubmit(data: NgForm){
    console.log(data)
    const projektname = data.form.value.name 
    // this.projectModel = new addProject(foldername, herzeigeprojekte, projektname)

    // this.updateWebsiteService.addProject().subscribe((data:project)=>{
    //   this.toastr.success('Der Name wurde verändert', 'Erfolg', {
    //     timeOut: 3000,
    //   });
    // }, (error)=>{
    //   this.toastr.error(error['statusText'], 'Error', {
    //     timeOut: 3000,
    //   });
    // })

  }

}
