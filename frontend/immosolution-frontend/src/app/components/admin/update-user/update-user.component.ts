import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/models/user';
import Swal from 'sweetalert2';

class updateUser implements user{
  constructor(
    public username: string,
    public password: string,
    public role: string,
    public instagram_at: string){
    }
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  @Input() user:user
  userModel: updateUser
  constructor(private userService: UserService,
              private toastr: ToastrService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm){
    const hashedPassword = this.userService.hashIt(data.form.value.passwort)
    const username = this.authService.getUsernameFromToken()
    this.userModel = new updateUser(data.form.value.name, hashedPassword, this.user['role'], this.user['instagram_at'])

    Swal.fire({
      title: 'Sicher, dass Sie Ihre Daten ändern wollen',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ja',
      cancelButtonText: 'nein',
    }).then((result) => {

      if (result.isConfirmed) {

        this.userService.updateUser(this.userModel, username).subscribe((data:user)=>{
          // this.user = data
          // console.log(this.user);
          
          this.toastr.success('Daten wurden verändert ', 'Erfolg!', {
            timeOut: 1500,
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

}
