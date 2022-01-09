import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FrontendService } from 'src/app/service/frontend.service';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { ankuendigung } from 'src/global/ankuendigungen';
class changeAnkuendigung implements ankuendigung {
  constructor(
    public ankuendigung: string,
    public switchAnkuendigung: boolean) {
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
  @ViewChild('button') button: ElementRef<HTMLElement>;
  @ViewChild('text') text: ElementRef<HTMLElement>;

  constructor(private frontendService: FrontendService,
              private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

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
    this.updateAnkuendigung = new changeAnkuendigung(this.ankuendigungen['ankuendigung'], buttonState)

    this.updateWebsiteService.updateAnkuendigung(this.updateAnkuendigung).subscribe((data: ankuendigung)=>{
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

  changeText(){
    const text = this.text.nativeElement.firstChild['data']
    const ankuendigung = this.updateWebsiteService.getAnkuendigung()
    this.updateAnkuendigung = new changeAnkuendigung(text, Boolean(ankuendigung))

    this.updateWebsiteService.updateAnkuendigung(this.updateAnkuendigung).subscribe((data: ankuendigung)=>{
      this.toastr.success('Text wurder verändert ', 'Erfolg!', {
        timeOut: 700,
      });
      setTimeout(() => {
        location.reload()
      }, 700);
    }, (error)=>{
      this.toastr.error('Login error, '+error['statusText'], 'Error', {
        timeOut: 3000,
      });
    })
  }


  onChange(event){
    console.log(event.target.files[0].name)
    
  }

}
