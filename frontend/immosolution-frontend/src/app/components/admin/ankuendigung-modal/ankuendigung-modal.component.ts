import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ankuendigung-modal',
  templateUrl: './ankuendigung-modal.component.html',
  styleUrls: ['./ankuendigung-modal.component.scss']
})
export class AnkuendigungModalComponent implements OnInit {

  @Input() ueberUnsText: string
  @Input() privatkundenText: string
  @Input() gruendungText: string

  constructor() { }

  ngOnInit(): void {
  }

}
