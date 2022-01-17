import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() toggleMainEvent = new EventEmitter<boolean>();

  constructor(private userService: UserService,
              private authService: AuthService) { }

  user: any

  ngOnInit(): void {
    this.getUser()
  }

  toggleAnswer: boolean = false
  toggleSidebar(){
    this.toggleAnswer = !this.toggleAnswer
    this.toggleMainEvent.emit(this.toggleAnswer);
  }

  getUser(){
    const username = this.authService.getUsernameFromToken()
    this.userService.getUserInfos(username).subscribe((data: user)=>{
      this.user = data
    })
  }

}