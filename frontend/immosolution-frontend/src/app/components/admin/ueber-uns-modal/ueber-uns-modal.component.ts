import { Component, Input, OnInit } from '@angular/core';

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
  showImage: boolean = false;
  showSelectedImage: boolean = false
  @Input() ueberUnsText: string
  @Input() privatkundenText: string
  @Input() gruendungText: string

  constructor() { }

  ngOnInit(): void {
  }



  openUeberUns(){
    if(this.showPrivatkunden || this.showGruendung || this.showImage){
      this.showPrivatkunden = false;
      this.showGruendung = false;
      this.showImage = false
    }
    
    if(this.showUeberUns){
      this.showUeberUns = false;
    }else{
      this.showUeberUns = true
    }
  }

  openPrivatkunden(){
    if(this.showUeberUns || this.showGruendung || this.showImage){
      this.showUeberUns = false;
      this.showGruendung = false;
      this.showImage = false;
    }
    
    if(this.showPrivatkunden){
      this.showPrivatkunden = false;
    }else{
      this.showPrivatkunden = true;
    }
  }

  openGruendung(){
    if(this.showPrivatkunden || this.showUeberUns || this.showImage){
      this.showPrivatkunden = false;
      this.showUeberUns = false;
      this.showImage = false;
    }
    
    if(this.showGruendung){
      this.showGruendung = false;
    }else{
      this.showGruendung = true
    }
  }

  openImage(){
    if(this.showPrivatkunden || this.showUeberUns || this.showGruendung){
      this.showPrivatkunden = false;
      this.showUeberUns = false;
      this.showGruendung = false;
    }
    
    if(this.showImage){
      this.showImage = false
    }else{
      this.showImage = true
    }
  }

  selectedImage(){
    
  }

  selectedFile(event){

  }


}
