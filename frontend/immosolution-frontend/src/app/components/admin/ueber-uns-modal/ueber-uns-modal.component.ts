import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { gruendung } from 'src/models/gruendung';
import { privatkunden } from 'src/models/privatkunden';
import { ueberUns } from 'src/models/ueberUns';
import Swal from 'sweetalert2';

class ueberUnsModel implements ueberUns{
  constructor(
    public UberUnsImage: string,
    public UberUnsText: string
  ){}
}

class privatkundenModel implements privatkunden{
  constructor(
    public privatkundenText: string
  ){}
}

class gruendungModel implements gruendung{
  constructor(
    public gruendungText: string
  ){}
}

@Component({
  selector: 'app-ueber-uns-modal',
  templateUrl: './ueber-uns-modal.component.html',
  styleUrls: ['./ueber-uns-modal.component.scss']
})
export class UeberUnsModalComponent implements OnInit {

  disableButton: boolean = false
  showUeberUns: boolean = false;
  showPrivatkunden: boolean = false;
  showGruendung: boolean = false;
  showSelectedImage: boolean = false
  
  @Input() ueberUnsText: string
  @Input() privatkundenText: string
  @Input() gruendungText: string
  @Input() ueberUnsImage: string
  
  @ViewChild('inputUeberUnsText') inputUeberUnsText: ElementRef<HTMLElement>;
  @ViewChild('inputPrivatkundenText') inputPrivatkundenText: ElementRef<HTMLElement>;
  @ViewChild('inputGruendungText') inputGruendungText: ElementRef<HTMLElement>;
  
  // variables for the models
  updateUeberUns: ueberUnsModel
  updatePrivatkunden: privatkundenModel
  updateGruendung: gruendungModel
  
  // variables for text/file that needs to be changed
  submitUeberUnsText: string | undefined
  submitPrivatkundenText:string | undefined
  submitGruendungText: string | undefined
  fileName: string | undefined

  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  showText(area){
    if(area == "privatkunden"){
      // before closing whats opened, get the latest data
      if(this.showUeberUns){
        this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
      }else if(this.showGruendung){
        this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
      }

      // open the content if the other texts have not been opened yet
      if(!this.submitGruendungText && !this.submitUeberUnsText){
        this.showPrivatkunden = true;
        this.showUeberUns = false;
        this.showGruendung = false;
        this.showSelectedImage = false;
        // trim, to remove the spaces at the beginning and end of the string
        // some browsers tend to add spaces at the beginning and end of a string
        setTimeout(() => {
          this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
        }, 200);
      }else if(this.submitUeberUnsText != this.ueberUnsText && this.submitUeberUnsText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = true;
            this.showUeberUns = false;
            this.showGruendung = false;
            this.showSelectedImage = false;

            this.submitUeberUnsText = this.ueberUnsText
            setTimeout(() => {
              this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else if(this.submitGruendungText != this.gruendungText && this.submitGruendungText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = true;
            this.showUeberUns = false;
            this.showGruendung = false;
            this.showSelectedImage = false;
            this.submitGruendungText = this.gruendungText
            setTimeout(() => {
              this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else{
        this.showPrivatkunden = true;
        this.showUeberUns = false;
        this.showGruendung = false;
        this.showSelectedImage = false;
        // trim, um die Abstände am Anfang und Ende zu löschen
        setTimeout(() => {
          this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
        }, 200);
      }
    }else if(area == "ueberUns"){
      if(this.showPrivatkunden){
        this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
      }else if(this.showGruendung){
        this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
      }
      if(!this.submitGruendungText && !this.submitPrivatkundenText){
        this.showPrivatkunden = false;
        this.showUeberUns = true;
        this.showGruendung = false;
        this.showSelectedImage = false;
        setTimeout(() => {
          this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
        }, 200);
      }else if(this.submitPrivatkundenText != this.privatkundenText && this.submitPrivatkundenText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = false;
            this.showUeberUns = true;
            this.showGruendung = false;
            this.showSelectedImage = false;
            this.submitPrivatkundenText = this.privatkundenText
            setTimeout(() => {
              this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else if(this.submitGruendungText != this.gruendungText && this.submitGruendungText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = false;
            this.showUeberUns = true;
            this.showGruendung = false;
            this.showSelectedImage = false;
            this.submitGruendungText = this.gruendungText
            setTimeout(() => {
              this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else{
        this.showPrivatkunden = false;
        this.showUeberUns = true;
        this.showGruendung = false;
        this.showSelectedImage = false;
        setTimeout(() => {
          this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
        }, 200);
      }
    }else if(area == "gruendung"){
      if(this.showPrivatkunden){
        this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
      }else if(this.showUeberUns){
        this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
      }
      if(!this.submitUeberUnsText && !this.submitPrivatkundenText){
        this.showPrivatkunden = false;
        this.showUeberUns = false;
        this.showGruendung = true;
        this.showSelectedImage = false;
        setTimeout(() => {
          this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
        }, 200);
      }else if(this.submitPrivatkundenText != this.privatkundenText && this.submitPrivatkundenText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = false;
            this.showUeberUns = false;
            this.showGruendung = true;
            this.showSelectedImage = false;
            this.submitPrivatkundenText = this.privatkundenText 
            setTimeout(() => {
              this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else if(this.submitUeberUnsText != this.ueberUnsText && this.submitUeberUnsText){
        Swal.fire({
          title: 'Achtung Ihr Text wird nicht gespeichert!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ignorieren',
          cancelButtonText: 'zurück',
        }).then((result) => {
          if (result.isConfirmed) {
            this.showPrivatkunden = false;
            this.showUeberUns = false;
            this.showGruendung = true;
            this.showSelectedImage = false;
            this.submitUeberUnsText = this.ueberUnsText
            setTimeout(() => {
              this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
            }, 200);
          } else if (result.isDismissed) {}
        })
      }else{
        this.showPrivatkunden = false;
        this.showUeberUns = false;
        this.showGruendung = true;
        this.showSelectedImage = false;
        setTimeout(() => {
          this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
        }, 200);
      }
    }
    else if(area == "image"){
      this.showSelectedImage = !this.showSelectedImage;
    }
  }

  selectedFile(event){
    this.fileName = event.target.files[0].name
  }

  onSubmit(area){
    // console.log(this.submitUeberUnsText, this.submitGruendungText, this.submitPrivatkundenText)
    if(area == 'ueberUns'){
      //if über uns was opened
      if(this.submitUeberUnsText){
        //check if the user has changed the text since it was opened
        this.submitUeberUnsText = this.inputUeberUnsText.nativeElement.firstChild['data'].trim()
        if(this.submitUeberUnsText != this.ueberUnsText){
          //check if a file was uploaded
          if(this.checkFileWasUploaded()){
            this.updateUeberUns = new ueberUnsModel(this.fileName, this.submitUeberUnsText)
          }else{
            this.updateUeberUns = new ueberUnsModel (this.ueberUnsImage, this.submitUeberUnsText)
          }
        // if über uns was opened but not changed and the image was changed
        }else if(this.checkFileWasUploaded()){
          this.updateUeberUns = new ueberUnsModel (this.fileName, this.ueberUnsText)
        }
      // if file was changed but not the text
      }else if(this.checkFileWasUploaded() && !this.submitUeberUnsText){
        this.updateUeberUns = new ueberUnsModel (this.fileName, this.ueberUnsText)
      }

      if(this.updateUeberUns){
        Swal.fire({
          title: 'Wollen Sie wirklich den Text bzw. das Bild ändern?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ja, verändern',
          cancelButtonText: 'Nein',
        }).then((result) => {
    
          if (result.isConfirmed) {
    
            this.updateWebsiteService.updateUeberUns(this.updateUeberUns).subscribe((data: ueberUns)=>{
              this.toastr.success('Über uns wurde verändert', 'Erfolg!', {
                timeOut: 2000,
              });
              this.ueberUnsText = data['angebot']
              this.ueberUnsImage = data['ueberuns_image']
            })
    
          } else if (result.isDismissed) {
    
          }
        })
      }else{
        this.toastr.error('Sie haben nichts ausgewählt', 'Fehler!', {
          timeOut: 2000,
        });
      }


    }else if(area == 'privatkunden'){
      if(this.submitPrivatkundenText){
        //check if the user has changed the text since it was opened
        this.submitPrivatkundenText = this.inputPrivatkundenText.nativeElement.firstChild['data'].trim()
        if(this.submitPrivatkundenText != this.privatkundenText){
          this.updatePrivatkunden = new privatkundenModel (this.submitPrivatkundenText)
        }
      }
      if(this.updatePrivatkunden){
        Swal.fire({
          title: 'Wollen Sie wirklich den Text ändern?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ja, verändern',
          cancelButtonText: 'Nein',
        }).then((result) => {
    
          if (result.isConfirmed) {
    
              this.updateWebsiteService.updatePrivatkunden(this.updatePrivatkunden).subscribe((data: ueberUns)=>{
                this.toastr.success('Privatkunden wurde verändert', 'Erfolg!', {
                  timeOut: 2000,
                });
                this.privatkundenText = data['privatkunden']
              })
            
    
          } else if (result.isDismissed) {
    
          }
        })
      }else{
        this.toastr.error('Sie haben nichts ausgewählt', 'Fehler!', {
          timeOut: 2000,
        });
      }


    }else if(area == 'gruendung'){
      if(this.submitGruendungText){
        this.submitGruendungText = this.inputGruendungText.nativeElement.firstChild['data'].trim()
        if(this.submitGruendungText != this.gruendungText){
          this.updateGruendung = new gruendungModel (this.submitGruendungText)
        }
      }
      if(this.updateGruendung){
        Swal.fire({
          title: 'Wollen Sie wirklich den Text ändern?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ja, verändern',
          cancelButtonText: 'Nein',
        }).then((result) => {
    
          if (result.isConfirmed) {
    
            this.updateWebsiteService.updateGruendung(this.updateGruendung).subscribe((data: ueberUns)=>{
              this.toastr.success('Gründung wurde verändert', 'Erfolg!', {
                timeOut: 2000,
              });
              this.gruendungText = data['gruedung']
            })
    
          } else if (result.isDismissed) {
    
          }
        })
      }else{
        this.toastr.error('Sie haben nichts ausgewählt', 'Fehler!', {
          timeOut: 2000,
        });
      }
    }
  }

  checkFileWasUploaded(){
    if(this.fileName){
      return true
    }else{
      return false
    }
  }

}
