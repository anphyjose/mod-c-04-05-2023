import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient) { }

  login(username:string,password:string){
 
    // const signup : Signup[]=[]
  
    console.log('loginss'+username+password)
  const body = new HttpParams()
  .set('grant_type','password')
   .set('client_id','mod-c-user')
   .set('client_secret','wTV8jP531JIpjkxpctjukTefGUVUvq5p')
   .set('username',username)
   .set('password',password);
  
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded' // 👈
      })
    };
  
  const data={
   'client_id':'mod-c-user',
    'client_secret':'wTV8jP531JIpjkxpctjukTefGUVUvq5p',
    'grant_type':'password',
    'username':username,
    'password':password
  };
  
  
      return this.http.post('http://192.168.1.87:8080/realms/mode-c/protocol/openid-connect/token',body,httpOptions);
    
  
  
  }
}
