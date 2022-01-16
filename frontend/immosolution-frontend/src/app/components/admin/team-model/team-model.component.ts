import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateWebsiteService } from 'src/app/service/update-website.service';
import { team } from 'src/models/team';
import Swal from 'sweetalert2';


class changeTeam implements team {
  constructor(
    public mitarbeiter: string,
    public team_image: string) {
    }
  }

@Component({
  selector: 'app-team-model',
  templateUrl: './team-model.component.html',
  styleUrls: ['./team-model.component.scss']
})
export class TeamModelComponent implements OnInit {

  showSelectedImage: boolean = false
  filename: string | undefined
  teamModel: changeTeam
  @ViewChild('text') text: ElementRef<HTMLElement>;

  @Input() teamText: string
  @Input() teamImage: string


  constructor(private updateWebsiteService: UpdateWebsiteService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changeContent(){
    const teamText = this.text.nativeElement.firstChild['data'].trim()

    if(teamText != this.teamText && this.filename){
      this.teamModel = new changeTeam (teamText, this.filename)
    }else if(teamText == this.teamText && this.filename){
      this.teamModel = new changeTeam (this.teamText, this.filename)
    }else if(teamText != this.teamText && !this.filename){
      this.teamModel = new changeTeam (teamText, this.teamImage)
    }

    // if nothing was changed error pops up
    if(!this.teamModel){
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
          if(this.teamModel){
            this.updateWebsiteService.updateTeam(this.teamModel).subscribe((data:team)=>{
              this.teamText = data['mitarbeiter'];
              this.teamImage = data['team_image']
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


  showImage(){
    this.showSelectedImage = !this.showSelectedImage
  }
  selectedFile(event){
    this.filename = event.target.files[0].name
  }

}
