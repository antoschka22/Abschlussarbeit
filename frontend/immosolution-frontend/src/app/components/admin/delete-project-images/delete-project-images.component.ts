import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { project } from 'src/models/project';
import { projectImage } from 'src/models/projectImage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-project-images',
  templateUrl: './delete-project-images.component.html',
  styleUrls: ['./delete-project-images.component.scss']
})
export class DeleteProjectImagesComponent implements OnInit {

  @Input() project: project;
  @Input() deleteImage: boolean;
  @Output() deleteImageBoolean = new EventEmitter<any>()
  selectedImages: {'id': string}[] = []

  constructor(private toastr: ToastrService,
              private updateWebsiteService: UpdateWebsiteService) { }

  ngOnInit(): void {
    this.setSelected()
  }

  setSelected(){
    this.project['projektbilder'].forEach(bild => {
      bild['selected'] = false
    });
  }

  sendBackDeleteImage(){
    this.deleteImageBoolean.emit(!this.deleteImage)
  }


  selectImage(id: string){
    this.project['projektbilder'].forEach(bild => {
      if(bild['id'] == id){
        if(bild['selected']){
          let index = this.selectedImages.indexOf(bild)
          this.selectedImages.splice(index, 1)
          bild['selected'] = false
        }else{
          this.selectedImages.push({'id': id})
          bild['selected'] = true
        }
        return
      }
    });
    // console.log(this.selectedImages);
  }

  deleteImages(){
    if(this.selectedImages.length == 0){
      this.toastr.error('Sie müssen ein Bild auswählen', 'Error', {
        timeOut: 3000,
      });
    }else{
      Swal.fire({
        title: 'Wollen Sie wirklich die Bilder löschen',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ja',
        cancelButtonText: 'Nein',
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          this.selectedImages.forEach(image => {
            this.updateWebsiteService.deleteImage(image['id']).subscribe()
          });
          this.toastr.success('Die Bilder wurden erfolgreich gelöscht', 'Erfolg', {
            timeOut: 3000,
          });
          this.sendBackDeleteImage()
  
        } else if (result.isDismissed) {
  
        }
      })
    }
  }


}
