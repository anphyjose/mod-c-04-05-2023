import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class PublicRegistrationService {
  constructor(private httpclient:HttpClient) { }

  registration(user:Signup){
    console.log(user);
    
   return this.httpclient.post("http://192.168.1.87:8083/api/v1/user/registration",user,{
    headers : {
      'Content-Type': 'application/json'
    },
    responseType: 'text'
   });
  // return this.httpclient.post(" http://localhost:3000/signup",user);
   
  }

  // constructor() { }
}
