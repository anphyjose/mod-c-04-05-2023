import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  token:any = localStorage.getItem('token');
  
  private apiUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getPunchinUsers(){
  //  alert(this.userPid);
  
    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
  
     //return this.http.get(`${this.apiUrl}/api/v1/report/lead-chart-volume/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
  //  return this.http.get(`${this.apiUrl}/api/v1/report/punchInUsers`)
  return this.http.get('http://192.168.1.87:8085/api/v1/report/punchInUsers',httpOptions)

}
}
