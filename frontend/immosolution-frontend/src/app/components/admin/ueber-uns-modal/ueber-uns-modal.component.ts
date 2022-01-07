import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ueber-uns-modal',
  templateUrl: './ueber-uns-modal.component.html',
  styleUrls: ['./ueber-uns-modal.component.scss']
})
export class UeberUnsModalComponent implements OnInit {

  @Input() ueberUnsText: string
  @Input() privatkundenText: string
  @Input() gruendungText: string

  constructor() { }

  ngOnInit(): void {
  }

}
