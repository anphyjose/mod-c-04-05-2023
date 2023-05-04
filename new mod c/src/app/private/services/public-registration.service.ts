import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class PublicRegistrationService {
  token:any = localStorage.getItem('token');
  companyUserName:any = localStorage.getItem('companyUserName');

  username:any = localStorage.getItem('username');
  userid:any=localStorage.getItem('id');
  private apiUrl = environment.baseUrl;
  constructor(private httpclient:HttpClient, private router:Router,
    // private location: Location
    ) { }

registration(user:Signup){
  console.log(user);
  
//  return this.httpclient.post("http://192.168.1.87:8083/api/v1/user/registration",user,{
//   headers : {
//     'Content-Type': 'application/json',
//     'Authorization': 'bearer ' + this.token
//   },
//   responseType: 'text'
//  });

// return this.httpclient.post("http://192.168.1.87:8083/api/v1/company/userRegistration",user,{
  return this.httpclient.post(`${this.apiUrl}/api/v1/company/userRegistration`,user,{
  headers : {
    'Content-Type': 'application/json',
    'Authorization': 'bearer ' + this.token
  },
  responseType: 'text'
 });

 
}

getAllRoles(){
  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'bearer ' + this.token
    })
  };
  // return this.httpclient.get('http://192.168.1.87:8083/api/v1/company/role/all',httpOptions)
  return this.httpclient.get(`${this.apiUrl}/api/v1/company/role/all`,httpOptions)
}
 
getUser(){

  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'bearer ' + this.token
    })
  };

  console.log("hi"+this.token);
  // return this.httpclient.get('http://192.168.1.87:8083/api/v1/company/user/users',httpOptions)
  return this.httpclient.get(`${this.apiUrl}/api/v1/company/user/users`,httpOptions)
 

}

companyUsers( id:any){
  console.log(this.token);
  console.log('filessss'+ id);
  console.log('hello'+  this.companyUserName);
  const httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'bearer ' + this.token
    })
  };

   //return this.httpclient.get('http://192.168.1.87:8084/api/v1/company/user/find-user/'+this.companyUserName,httpOptions)
  //  return this.httpclient.get('http://192.168.1.87:8083/api/v1/company/user/find-user?id='+id,httpOptions)
  return this.httpclient.get(`${this.apiUrl}/api/v1/company/user/find-user?id=`+id,httpOptions)
}
userProfile(file:File,id:string){
  // const formData: FormData = new FormData();

  console.log('filessss',id);
  const fd = new FormData();
  fd.append('image', file,file.name);

  // formData.append('file', file);
  // return this.httpclient.post('http://192.168.1.87:8083/api/v1/company/user/imageUpload/'+id,fd,
  return this.httpclient.post(`${this.apiUrl}/api/v1/company/user/imageUpload/`+id,fd,
  {
    headers:{
      // 'Content-Type': 'multipart/form-data',
     'Authorization': 'bearer ' + this.token

    },
    responseType: 'text'
 

  }).subscribe
  ((data:any)=>
  {
     console.log("respose is "+data);
    //  window.location.reload();

    // this.router.navigate(['/profile',{ id: id }])
  //    this.reloadComponent();
  // window.location.reload();
  // this.router.navigate(['/heroes', { id: heroId }]);
  })
 
}

// reloadComponent() {

//   window.location.reload();
// }

// getAllRoles(){
//   const httpOptions = {
//     headers: new HttpHeaders({
//      'Content-Type': 'application/json',
//      'Authorization': 'bearer ' + this.token
//     })
//   };
//   return this.http.get('http://192.168.1.87:8083/api/v1/role/all/',httpOptions)
// }
logout(){
  localStorage.clear();
  
}

}