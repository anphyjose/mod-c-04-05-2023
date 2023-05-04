import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicUserService {
private apiUrl = environment.baseUrl;
  // constructor() { }
  token:any = localStorage.getItem('token');
  username:any = localStorage.getItem('username');
  userid:any=localStorage.getItem('id');
  

  constructor(private http:HttpClient,private router:Router){}
    // private location: Location) { }

  users(){
    console.log(this.token);
    
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': 'bearer ' + this.token
      })
    };
    // return this.http.get("http://localhost:3000/users")
    // return this.http.get('http://192.168.1.87:8083/api/v1/company/user/find-user/'+this.username,httpOptions)
    return this.http.get(`${this.apiUrl}/api/v1/company/user/find-user/`+this.username,httpOptions)
  

  }
  userProfile(file:File,id:string){
    // const formData: FormData = new FormData();

    console.log('filessss',id);
    const fd = new FormData();
    fd.append('image', file,file.name);

    // formData.append('file', file);
    // return this.http.post('http://192.168.1.87:8083/api/v1/user/imageUpload/'+id,fd,
    return this.http.post(`${this.apiUrl}/api/v1/user/imageUpload/`+id,fd,
    {
      headers:{
        // 'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization': 'bearer ' + this.token

      },
      responseType: 'text'
   

    }).subscribe
    ((data:any)=>
    {
       console.log("respose is "+data);
       this.router.navigate(['private/profile'])
       this.reloadComponent();
      
    })
   
  }

  reloadComponent() {
    // this.location.back();
    // this.location.forward();
    window.location.reload();
  }

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
