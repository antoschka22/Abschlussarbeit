import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { project } from 'src/global/project';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projekte',
  templateUrl: './projekte.component.html',
  styleUrls: ['./projekte.component.scss']
})
export class ProjekteComponent implements OnInit {

  @Input() showFertigeProjekte: boolean
  @Input() showLaufendeProjekte: boolean
  changeProjectname: boolean = false
  projects: project[]
  filteredString: string = ''

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
  showTextUpdate(){
    this.changeProjectname = !this.changeProjectname
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

}
