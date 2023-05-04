import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Companyregistration } from '../../models/companyregistration';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
  personalDetails!: FormGroup;
  userLogin:any;
  response: any;
  constructor(private formBuilder: FormBuilder,private router:Router, private loginser:LoginService,private activatedRouteing:ActivatedRoute) { }

  ngOnInit(): void {
    this.personalDetails = this.formBuilder.group({
      userName: ['', Validators.required], password: ['', Validators.required],

  });

  const token = this.activatedRouteing.snapshot.queryParamMap.get('token');
  console.log(token);
  
  //  console.log(this.activatedRouteing.snapshot.params['token']);
    this.loginser.tokenChecking(token).subscribe((result) => {
      this.response = result;
      console.log(this.response);
      if(this.response.active==true)
      this.router.navigate(['/dashboard'])
  })
// login(){
//   alert("hello")
//   console.log(this.personalDetails.value);
//   console.log(this.personalDetails.value.username);
//   this.router.navigate(["dashboard"]);
 }
async login(){
  const loginUser : Companyregistration = this.personalDetails.value;
  // const loginUser : any = this.personalDetails.value;
  console.log(this.personalDetails.value.userName);
  console.log(this.personalDetails.value.password);
  await this.loginser.login(this.personalDetails.value.userName,this.personalDetails.value.password).subscribe(( response : any) => {
    this.userLogin=response;
    // console.log(this.userLogin.id);
    
    // console.log(response.access_token);
    const user_name= this.personalDetails.value.userName;
    const token = response.access_token;
    // alert("username is :"+user_name);
   
     localStorage.setItem('token',token)
     localStorage.setItem('username',user_name)
    // alert("login Successfully.")
    // this.router.navigate(["public/login"]);
   this.router.navigate(['/dashboard'])
  })
  }
  
}
