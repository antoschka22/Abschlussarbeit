import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { project } from 'src/models/project';
import Swal from 'sweetalert2';

class changeProjectName implements project {
  constructor(
    public foldername: number,
    public herzeigeprojekte: boolean,
    public manuellerPost: boolean,
    public projektname: string) {
    }
  }

@Component({
  selector: 'app-projekte',
  templateUrl: './projekte.component.html',
  styleUrls: ['./projekte.component.scss']
})
export class ProjekteComponent implements OnInit {

  @Input() showFertigeProjekte: boolean
  @Input() showLaufendeProjekte: boolean
  projectModel: changeProjectName
  changeProjectname: boolean = false
  projects: project[]
  filteredString: string = ''
  changeProjektname: string
  showInsertImageSection: boolean = false

  @Output() goBackOutput = new EventEmitter<boolean>();

  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProjectInfo()
  }

  getProjectInfo(){
    if(this.showFertigeProjekte){
      this.updateWebsiteService.getDoneProjects().subscribe((data: project[])=>{

        this.projects = data
        
      
      }, (error)=>{
      
        this.toastr.error('Login error, '+error['statusText'], 'Error', {
          timeOut: 3000,
        });
      
      })
    }else if(this.showLaufendeProjekte){
      this.updateWebsiteService.getUndoneProjects().subscribe((data: project[])=>{

        this.projects = data        
      
      }, (error)=>{
      
        this.toastr.error('Login error, '+error['statusText'], 'Error', {
          timeOut: 3000,
        });
      
      })
    }
  }

  goBack(value: boolean) {
    this.goBackOutput.emit(value);
  }
  showTextUpdate(projektname: string){
    // der eigentliche Projektname wird in echter Zeit veränder, das heißt, dass während der Titel verändert wird, die Bilder nicht mehr angezeigt werden
    this.changeProjektname = projektname
    this.changeProjectname = !this.changeProjectname
    this.showInsertImageSection = false
  }
  closeText(){
    this.changeProjectname = false
    this.showInsertImageSection = false
  }
  showInsertImage(){
    this.showInsertImageSection = !this.showInsertImageSection
    this.changeProjectname = false
  }
  updateImageArray(addedInfo){
    let gefundenerName: number = -1
    this.showInsertImageSection = false

    for(var i=0; i<this.projects.length; i++) {
      if(this.projects[i].projektname == addedInfo['projektname']) {
        gefundenerName = i;
        break;
      }
    }

    this.projects[gefundenerName]['projektbilder'].push({id: addedInfo['imageID'], "projektbilder": addedInfo['image']})    

  }


  deleteProject(projectName){

    Swal.fire({
      title: 'Wollen Sie wirklich dieses Projekt löschen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ignorieren',
      cancelButtonText: 'zurück',
    }).then((result) => {

      if (result.isConfirmed) {

        this.updateWebsiteService.deleteProject(projectName).subscribe((data)=>{

          //delete project from the array
          const ProjectIndex = this.projects.indexOf(data['projektname'])
          this.projects.splice(ProjectIndex, 1);

          this.toastr.success('Projekt wurde gelöscht', 'Erfolg', {
            timeOut: 3000,
          });
    
        }, (error)=>{
    
          this.toastr.error('Ein Fehler ist aufgetreten, '+error, 'Error', {
            timeOut: 3000,
          });
    
        })
      
      } else if (result.isDismissed) {}
    })

  }

  onSubmit(projectID: string, herzeigeprojekte: boolean, manuellerpost: boolean, data: NgForm, foldername:number){
    const projektname = data.form.value.name 
    this.projectModel = new changeProjectName(foldername, herzeigeprojekte, manuellerpost, projektname)
    let gefundenerName: number = -1

    Swal.fire({
      title: 'Sind Sie sich sicher, dass der Namen verändert werden soll',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nein',
    }).then((result) => {

      if (result.isConfirmed) {

        if(projektname == projectID){
          this.toastr.error('Sie haben den Namen nicht verändert', 'Error', {
            timeOut: 3000,
          });
        }else if(projektname != projectID){
    
          for(var i=0; i<this.projects.length; i++) {
            if(this.projects[i].projektname == projectID) {
              gefundenerName = i;
              break;
            }
          }
    
          if(gefundenerName != -1){
            this.updateWebsiteService.updateProject(projectID, this.projectModel).subscribe((data:project)=>{
    
              this.projects[gefundenerName]['projektname'] = data['projektname']
              this.changeProjectname = false
    
              this.toastr.success('Der Name wurde verändert', 'Erfolg', {
                timeOut: 3000,
              });
            }, (error)=>{
              this.toastr.error(error['statusText'], 'Error', {
                timeOut: 3000,
              });
            })
          }
        }
      
      } else if (result.isDismissed) {
        
      }
    })

  }

}
