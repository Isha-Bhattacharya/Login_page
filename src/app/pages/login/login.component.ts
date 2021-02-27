import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  serverErrorMessages: String;
  model = {
    email: '',
    password: ''
  }


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  onSubmit(form: NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    )
  }

    // onSignIn(googleUser) {
    // //  var id_token = googleUser.getAuthResponse().id_token;
    //   var profile = googleUser.getBasicProfile();
    //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log('Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }
  // googleLogin(){
  //   this.userService.getGoogleAuth().subscribe(
  //     res=>{},
  //     err=>{}
  //   )
  // }
  new(){
    this.router.navigateByUrl('/register');
  }
  

}
