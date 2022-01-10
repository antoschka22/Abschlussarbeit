import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontendService } from 'src/app/service/frontend.service';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { ankuendigung } from 'src/global/ankuendigungen';
import Swal from 'sweetalert2';
class changeAnkuendigung implements ankuendigung {
  constructor(
    public ankuendigung: string,
    public switchAnkuendigung: boolean,
    public ankuendigung_image: string) {
    }
  }
  
@Component({
  selector: 'app-ankuendigung-modal',
  templateUrl: './ankuendigung-modal.component.html',
  styleUrls: ['./ankuendigung-modal.component.scss']
})
export class AnkuendigungModalComponent implements OnInit {

  ankuendigungen: ankuendigung
  updateAnkuendigung: changeAnkuendigung
  showText: boolean = false
  filename: string | undefined
  showSelectedImage: boolean = false
  @ViewChild('button') button: ElementRef<HTMLElement>;
  @ViewChild('text') text: ElementRef<HTMLElement>;

  constructor(private frontendService: FrontendService,
              private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAnkuendigungen();
  }

  getAnkuendigungen(){
    this.frontendService.getAnkuendigungen().subscribe((data: ankuendigung)=>{
      this.ankuendigungen = data
      let switchAnkuendigung: boolean = this.ankuendigungen['switchankuendigung'];

      //if the switchAnkuendigung is true, click the button so it is automatically on
      if(switchAnkuendigung){
        this.button.nativeElement.click();
      }

      this.updateWebsiteService.setAnkuendigung(String(switchAnkuendigung))

    })
  }

  toggle(event){
    // event.srcElement.attributes.role.ownerElement.checked = true
    let buttonState: boolean = event.srcElement.attributes.role.ownerElement.checked;
    this.updateAnkuendigung = new changeAnkuendigung(this.ankuendigungen['ankuendigung'], buttonState, this.ankuendigungen['ankuendigung_image'])

    this.updateWebsiteService.updateAnkuendigung(this.updateAnkuendigung).subscribe((data: ankuendigung)=>{
      //neuesten Stand
      this.ankuendigungen = data
      this.updateWebsiteService.setAnkuendigung(String(data['switchankuendigung']))
    }, (error)=>{
      this.toastr.error('Login error, '+error['statusText'], 'Error', {
        timeOut: 3000,
      });
    })
  }

  showTextUpdate(){
    this.showText = !this.showText
  }

  changeContent(){
    const text = this.text.nativeElement.firstChild['data']
    const switchAnkuendigung = this.updateWebsiteService.getSwitchAnkuendigung()
    if(!this.filename){
      this.updateAnkuendigung = new changeAnkuendigung(text, Boolean(switchAnkuendigung), this.ankuendigungen['ankuendigung_image'])
    }else{
      this.updateAnkuendigung = new changeAnkuendigung(text, Boolean(switchAnkuendigung), this.filename)
    }

    Swal.fire({
      title: 'Wollen Sie wirklich den Text bzw. das Bild ändern',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, ändern',
      cancelButtonText: 'Nein',
    }).then((result) => {

      if (result.isConfirmed) {

        this.updateWebsiteService.updateAnkuendigung(this.updateAnkuendigung).subscribe((data: ankuendigung)=>{
          this.ankuendigungen = data
          this.toastr.success('Text wurder verändert ', 'Erfolg!', {
            timeOut: 1000,
          });
    
        }, (error)=>{
          this.toastr.error('Login error, '+error['statusText'], 'Error', {
            timeOut: 3000,
          });
        })

      } else if (result.isDismissed) {

      }
    })
  }


  selectedFile(event){
    // console.log(event)
    this.filename = event.target.files[0].name
  }

  showImage(){
    this.showSelectedImage = !this.showSelectedImage
  }

}
