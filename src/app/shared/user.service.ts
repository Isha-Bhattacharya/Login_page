import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {User} from './models/user.model';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
   
    fullName: '',
    email: '',
    password: '',
    
  };
  

  noAuthHeader = { headers: new HttpHeaders({'NoAuth':'True'}) };
  constructor(private http: HttpClient) {

  }

  //HTTP METHODS
  postUser(user: User){
    return this.http.post(environment.apiBaseURL+'/register', user, this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseURL+'/login', authCredentials, this.noAuthHeader);
  }


  // forgot(credentials){
  //   return this.http.post(environment.apiBaseURL+'/forgot', credentials);
  // }

  forgot(email){
    return this.http.post(environment.apiBaseURL+'/forgot', email, this.noAuthHeader);
  }

  resetPassword(pass, token){
    return this.http.post(environment.apiBaseURL+'/reset/'+token, pass, this.noAuthHeader);
  }
  
  checkToken(token){
    return this.http.get(environment.apiBaseURL+'/reset/:' + token, this.noAuthHeader);
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseURL+'/user-profile');
  }


  
//   getGoogleAuth(){
//     return this.http.get(environment.apiBaseURL+'/auth/google');
//   }

  //HELPER METHODS
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
