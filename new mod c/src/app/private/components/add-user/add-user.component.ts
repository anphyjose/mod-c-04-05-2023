import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
// import { NgWizardService } from 'ng-wizard';
// import { NgWizardService } from 'ng-wizard';
import { Signup } from '../../models/signup';
import { PublicRegistrationService } from '../../services/public-registration.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
//   personalDetails!: FormGroup;
//   constructor(private formBuilder: FormBuilder,private userser:UserService,private router:Router) { }

//   ngOnInit(): void {
//     this.personalDetails = this.formBuilder.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//          userName: ['', Validators.required],
//          emailAddress: ['', Validators.required,Validators.email],
//          phoneNo: ['',Validators.required],
//         role:['',Validators.required],
     
//      });
//   }
// add(){

// const signupUser :any = this.personalDetails.value;
//       this.userser.adduser(signupUser).subscribe((response:any) => {
//         console.log(response);
//   alert("USER ADDED SUCCESSFULLY")
//   this.router.navigate(["/dashboard"]);
// })}

title = 'multistep';
personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  // educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  // education_step = false;
  // step = 1;
  countryList:any;
  stateList:any;
  cityList:any;
  roleList:any
  constructor(private formBuilder: FormBuilder,
   
    private registerser:PublicRegistrationService,
    // private userser:public
    private router:Router,private ngWizardService: NgWizardService,
    private httpclient:HttpClient ){}
   

  ngOnInit() {

        this.personalDetails = this.formBuilder.group({
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
            userName: ['', Validators.required],
            emailAddress: ['', Validators.required,Validators.email],
           phoneNo: ['',Validators.required],
            password:['',Validators.required],
            role:['',Validators.required],
           companyId:['',Validators.required],
           companyName:['',Validators.required]

           
        });

        // this.countryser.countryDetails().subscribe(res=>{
        //   this.countryList=res;
        //     console.log(this.countryList)
this.registerser.getAllRoles().subscribe(res=>{
  this.roleList=res;
  console.log((this.roleList));
  
})

     
  }
  // dropdown menu//
  changeRole(e: any) {
    this.roleName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get roleName() {
    return this.personalDetails.get('cityName');
  }
  // =================================

  get personal() { return this.personalDetails.controls; }
  

 



  // wizards------------
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  
  
  register(){
    // alert("hello")

    const signupUser : any = this.personalDetails.value;
    // signupUser.companyId=localStorage.getItem('id');
    signupUser.companyId=localStorage.getItem('companyid');
    signupUser.companyName=localStorage.getItem('companyname');
    console.log(this.personalDetails.value);
    this.registerser.registration(signupUser)
    .subscribe((response:any) => {
      console.log(response);
      // const user_name= this.personalDetails.value.userName;
      // localStorage.setItem('companyUserName',user_name)
      // console.log(response.headers.get('header-key'));
      alert("Registered Successfully.")
      // this.router.navigate(["public/login"]);
     this.router.navigate(["/active"]);
    })
       
  }

}

