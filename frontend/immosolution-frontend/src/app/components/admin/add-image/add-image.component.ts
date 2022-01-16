import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { projectImage } from 'src/models/projectImage';

class addImage implements projectImage {
  constructor(
    public id: string,
    public projektbilder: string,
    public projektname: string) {
    }
  }

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  @Input() projectname: string       
  @Input() foldername: string
  @Output() sendNewImage = new EventEmitter<{image: string, projektname: string, imageID: string}>()     
  filename: string
  showSelectedImage: boolean = false
  imageModel: addImage

  ngOnInit(): void {
  }


  selectedFile(event){
    // console.log(event)
    this.filename = event.target.files[0].name
  }
  showImageSection(){
    this.showSelectedImage = !this.showSelectedImage
  }

  //  send the created image to the parent array
  updateImageArray(Addedimage: string, ChangedProjektname: string, imageID: string){
    this.sendNewImage.emit({image:Addedimage, projektname:ChangedProjektname, imageID:imageID})
  }

  updateImage(){
    if(this.filename){
      this.imageModel = new addImage("", this.filename, this.projectname)
      this.updateWebsiteService.addProjectImage(this.imageModel).subscribe((data: projectImage)=>{
        
        this.updateImageArray(data['projektbilder'], data['projekt_id'], data['id'])

        this.toastr.success('Das Bild wurde hochgeladen', 'Erfolg', {
          timeOut: 3000,
        });
      }, (error)=>{
      
        this.toastr.error('Login error, '+error['statusText'], 'Error', {
          timeOut: 3000,
        });
      
      })
    }else if(!this.filename){
      this.toastr.error('Sie müssen ein Bild auswählen', 'Error', {
        timeOut: 3000,
      });
    }
  }

}
