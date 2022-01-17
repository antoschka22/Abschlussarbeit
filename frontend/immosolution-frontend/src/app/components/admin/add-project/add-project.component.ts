import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  lastFoldername: number
  buttonState: boolean = false
  @ViewChild('button') button: ElementRef<HTMLElement>;

  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLastFoldername()
  }

  getLastFoldername(){
    this.updateWebsiteService.getLastFoldername().subscribe((data:number)=>{
      this.lastFoldername = data['foldername'] + 1
    })
  }

  onSubmit(data: NgForm){
    this.projectModel = new addProject (this.lastFoldername, this.buttonState, data.form.value.projektname)

    this.updateWebsiteService.addProject(this.projectModel).subscribe((data:project)=>{
      this.getLastFoldername()
      this.toastr.success('Das Projekt wurde hinzugefügt', 'Erfolg', {
        timeOut: 3000,
      });
    }, (error)=>{
      this.toastr.error(error['statusText'], 'Error', {
        timeOut: 3000,
      });
    })

  }

  toggle(event){
    this.buttonState = event.srcElement.attributes.role.ownerElement.checked;
  }

}
