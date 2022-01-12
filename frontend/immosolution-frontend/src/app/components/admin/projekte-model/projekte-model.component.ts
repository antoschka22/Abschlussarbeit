import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { projekte } from 'src/global/projekte';
import Swal from 'sweetalert2';

class changeProjekte implements projekte {
  constructor(
    public referenzprojekte: string,
    public projekte_image: string) {
    }
  }
  
@Component({
  selector: 'app-projekte-model',
  templateUrl: './projekte-model.component.html',
  styleUrls: ['./projekte-model.component.scss']
})
export class ProjekteModelComponent implements OnInit {

  @Input() projekteText: string
  @Input() projekteBild: string

  showText: boolean = false
  filename: string
  showSelectedImage: boolean = false
  projektModel: changeProjekte
  @ViewChild('text') text: ElementRef<HTMLElement>;

  constructor(private toastr: ToastrService,
              private updateWebsiteService: UpdateWebsiteService) { }

  ngOnInit(): void {
  }

  changeText(){
    const teamText = this.text.nativeElement.firstChild['data'].trim()

    if(teamText != this.projekteText && this.filename){
      this.projektModel = new changeProjekte (teamText, this.filename)
    }else if(teamText == this.projekteText && this.filename){
      this.projektModel = new changeProjekte (this.projekteText, this.filename)
    }else if(teamText != this.projekteText && !this.filename){
      this.projektModel = new changeProjekte (teamText, this.projekteBild)
    }

    // if nothing was changed error pops up
    if(!this.projektModel){
      this.toastr.error('Sie müssen etwas eingeben', 'Error', {
        timeOut: 3000,
      });
    }else{
      // if the text/image was changed show warning
      Swal.fire({
        title: 'Wollen Sie wirklich den Text bzw. das Bild ändern',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ja, ändern',
        cancelButtonText: 'Nein',
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.projektModel){
            this.updateWebsiteService.updateProjektText(this.projektModel).subscribe((data:projekte)=>{
              this.projekteText = data['referenzprojekte'];
              this.projekteBild = data['projekte_image']
              this.toastr.success('Text/Bild wurder verändert ', 'Erfolg!', {
                timeOut: 1500,
              });
            }, (error)=>{
              this.toastr.error('Input error, '+error['statusText'], 'Error', {
                timeOut: 3000,
              });
            })
          }
        } else if (result.isDismissed) {}
      })
    }
  }

  showTextUpdate(){
    if(!this.showText){
      this.showText = !this.showText
    }else if(this.showText && this.text.nativeElement.firstChild['data'].trim() != this.projekteText){
      Swal.fire({
        title: 'Ihr Text bzw. Bild wird nicht gespeichert',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ignorieren',
        cancelButtonText: 'zurück',
      }).then((result) => {
  
        if (result.isConfirmed) {

          this.showText = !this.showText
        
        } else if (result.isDismissed) {
          
        }
      })
    }else{
      this.showText = !this.showText
    }
  }
  selectedFile(event){
    this.filename = event.target.files[0].name
  }
  showImage(){
    this.showSelectedImage = !this.showSelectedImage
  }

}
