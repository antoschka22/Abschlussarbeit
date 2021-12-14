import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.comparePasswort();
  }

  hashPassword(){
    return this.userService.hashIt("test")
    // console.log(this.userService.hashIt("test"))
  }

  compare: any = false
  comparePasswort(){
    this.userService.compareIt("test", this.hashPassword())
  }

}
