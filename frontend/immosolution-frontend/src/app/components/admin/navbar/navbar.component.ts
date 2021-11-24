import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() toggleMainEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  toggleAnswer: boolean = false
  toggleSidebar(){
    this.toggleAnswer = !this.toggleAnswer
    this.toggleMainEvent.emit(this.toggleAnswer);
  }

}