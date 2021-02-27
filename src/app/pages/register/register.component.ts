import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  serverErrorMessages: String;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    this.userService.postUser(form.value).subscribe(
      res=> {
        this.resetForm(form);
        this.router.navigateByUrl('login');
      },
      err=> {
        if(err.status==422){
          this.serverErrorMessages = err.error.join('<br/>')
        }
        else
          this.serverErrorMessages = "Something went wrong. Please contact Admin";
      }
    );
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      
      fullName:'',
      email:'',
      password:'',
      
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  public isDisabled = false;
  check(){
    if(this.isDisabled)
      this.isDisabled = false;
    else
      this.isDisabled = true;
  }
}
