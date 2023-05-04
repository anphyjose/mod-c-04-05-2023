import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from '../../models/signup';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public-login',
  templateUrl: './public-login.component.html',
  styleUrls: ['./public-login.component.css']
})
export class PublicLoginComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  // educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  // education_step = false;
  step = 1;

  user_name!: string;
  password!: string;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private auth: AuthService,
    private http:HttpClient) { }

  ngOnInit() {

        this.personalDetails = this.formBuilder.group({
            // name: ['', Validators.required],
            username: ['', Validators.required,Validators.email],
            password: ['',Validators.required]
        });

        
   
  }

  get personal() { return this.personalDetails.controls; }
  
  get address() { return this.addressDetails.controls; }

  

async login(){
const loginUser : Signup = this.personalDetails.value;
// const loginUser : any = this.personalDetails.value;
console.log(this.personalDetails.value.username);
await this.auth.login(this.personalDetails.value.username,this.personalDetails.value.password).subscribe(( response : any) => {
  console.log(response.access_token);
  const user_name= this.personalDetails.value.username;
  const token = response.access_token;
   localStorage.setItem('token',token)
   localStorage.setItem('username',user_name)
  // alert("login Successfully.")
  // this.router.navigate(["public/login"]);
  this.router.navigate(['private/dashboard'])
})

}

}
