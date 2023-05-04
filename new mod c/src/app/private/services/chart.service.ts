import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  token:any = localStorage.getItem('token');
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

    
  getchartData(resultdate:any):Observable<any>
  {
    console.log(resultdate)
    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
    // const from ="2023-11-25";
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
   
    //  return this.http.get('http://192.168.1.87:8083/api/v1/report/User-chart/load?fDate='+resultdate.fdate+'&filterBy='+resultdate.type+'&tDate='+resultdate.tdate,httpOptions)
    return this.http.get(`${this.apiUrl}/api/v1/report/User-chart/load?fDate=`+resultdate.fdate+'&filterBy='+resultdate.type+'&tDate='+resultdate.tdate,httpOptions)
   
  }
 
  getLeadchartData1(resultdate:any):Observable<any>
  {
    console.log(resultdate)
    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
    // const from ="2023-11-25";
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/User-chart/load?fDate='+resultdate.fdate+'&filterBy='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
    return this.http.get(`${this.apiUrl}/api/v1/report/User-chart/load?fDate=`+resultdate.fdate+'&filterBy='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
   
  }
  getleadchartData(resultdate:any):Observable<any>
  {
   const userId=sessionStorage.getItem("userPid");
    console.log(resultdate);

    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
        if(userId!=""){
          return this.http.get(`${this.apiUrl}/api/v1/report/lead-chart/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&userPid='+userId+'&year='+resultdate.year,httpOptions)
    
        }
    // const from ="2023-11-25";
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/lead-chart/load?fDate='+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions
    return this.http.get(`${this.apiUrl}/api/v1/report/lead-chart/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions
 
      )
  }
  getInfluenceVisit(resultdate:any){
    console.log(resultdate);
   
    const userId=sessionStorage.getItem("userPid");
    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
        console.log("userid "+userId);
        
    // const from ="2023-11-25";
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/influenceVisit-chart/load?fDate='+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
    if(userId!=""){
      return this.http.get(`${this.apiUrl}/api/v1/report/influenceVisit-chart/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&userPid='+userId+'&year='+resultdate.year,httpOptions)

    }
    return this.http.get(`${this.apiUrl}/api/v1/report/influenceVisit-chart/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
  }

  getLeadVolume(resultdate:any){
    console.log(resultdate);

    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
    // const from ="2023-11-25";
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/lead-chart-volume/load?fDate='+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
    return this.http.get(`${this.apiUrl}/api/v1/report/lead-chart-volume/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions)
    // return this.http.get('http://192.168.1.87:8085/api/v1/report/lead-chart-volume/load?fDate=2023-03-01&filterBy=WTD&month=3&tDate=2023-03-13&year=2023',httpOptions)
  }

  getunproductivechartData(resultdate:any):Observable<any>
  {
    console.log(resultdate);
 const userId=sessionStorage.getItem("userPid");
    const httpOptions = {
          headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'bearer ' + this.token
          })
        };
        if(userId!=""){
          return this.http.get(`${this.apiUrl}/api/v1/report/UnproductiveVisit-chart/load?fDate=`+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&userPid='+userId+'&year='+resultdate.year,httpOptions)
    
        }
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/companyUser-chart/load?fDate=2023-02-02&filterBy==WTD&tDate=2023-03-04',
    // return this.http.get('http://192.168.1.87:8083/api/v1/report/lead-chart/load?fDate='+resultdate.fdate+'&filterBy=='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions
    return this.http.get(`${this.apiUrl}/api/v1/report/UnproductiveVisit-chart/load?fDate=`+resultdate.fdate+'&filterBy='+resultdate.type+'&month='+resultdate.month+'&tDate='+resultdate.tdate+'&year='+resultdate.year,httpOptions
 
      )
  }
}



