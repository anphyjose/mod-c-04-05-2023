import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/company/services/registration.service';
import { PublicRegistrationService } from '../../services/public-registration.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
userList:any;
// localStorage.setItem('companyid', this.userList.companyId);
//       localStorage.setItem('companyname', this.userList.companyName);
personalDetails!: FormGroup;
roleList:any;
userName: any = localStorage.getItem('username');
companyname:any=localStorage.getItem('companyname');
page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20,25,30];

  constructor(private registerser:PublicRegistrationService, private http:HttpClient,private router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registerser.getUser().subscribe(response=>{
      this.userList= response
      
     
      console.log(response);
      
      // console.log(this.userList);
      

    }),
    this.active(),

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
  
  view(users:any){
    // this.router.navigate(["/profile" ,users])
    const user_name= this.userList.userName;
     localStorage.setItem('companyUserName',user_name)
     console.log(user_name);
// this.router.navigate(["/profile/:id" ])
    alert(users.userName)
  }

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
      // window.location.reload();
    //  this.router.navigate(["/dashboard"]);
    })
       
  }
  onTableDataChange(event:any)
{
 
  this.page=event;
  this.active();
}
active(){
  this.registerser.getUser().subscribe(response=>{
    this.userList= response
    
   
    console.log(response);
    console.log("companyname"+this.companyname);
    // console.log(this.userList);
    // window.location.reload();
   
  })
}
}
