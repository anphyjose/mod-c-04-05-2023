import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  adduser(user:any){
    return this.http.post("http://localhost:3000/adduser",user)
  }
  getUser(){
    return this.http.get("http://localhost:3000/adduser")
  }
  getUserById(id:any)
{
  return this.http.get('http://localhost:3000/adduser/'+id);
}



// delete(bookingId:any)
// {
//   return this.httpclient.delete('http://localhost:3000/booking/' +bookingId);
// }

deleteUser(userId:any)
{
  return this.http.delete('http://localhost:3000/adduser/'+userId);
}
updateUser(id:any,user:any)
{
  return this.http.put('http://localhost:3000/flight/'+id,user);
}

}
