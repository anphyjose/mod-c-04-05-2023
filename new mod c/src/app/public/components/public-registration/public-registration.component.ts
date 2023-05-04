import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { Signup } from '../../models/signup';
import { PublicRegistrationService } from '../../services/public-registration.service';

@Component({
  selector: 'app-public-registration',
  templateUrl: './public-registration.component.html',
  styleUrls: ['./public-registration.component.css']
})
export class PublicRegistrationComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
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
    constructor(private formBuilder: FormBuilder,
      
      private regiser:PublicRegistrationService,
      private router:Router,private ngWizardService: NgWizardService,
      private httpclient:HttpClient ){}
     
  
    ngOnInit() {
  
          this.personalDetails = this.formBuilder.group({
           firstname: ['', Validators.required],
           lastname: ['', Validators.required],
              userName: ['', Validators.required],
              emailAddress: ['', Validators.required,Validators.email],
              phoneNo: ['',Validators.required],
              password:['',Validators.required],
          //     address: ['', Validators.required],
          //   country:['',Validators.required],
          //  state:['',Validators.required],
          //     city: ['', Validators.required],
              
          //     pincode: ['',Validators.required],
             createddate:['',Validators.required],
             updatedate:['',Validators.required]
          });


  
          // this.addressDetails = this.formBuilder.group({
          //   address: ['', Validators.required],
          //   country:['',Validators.required],
          //  state:['',Validators.required],
          //     city: ['', Validators.required],
              
          //     pincode: ['',Validators.required]
          // });
          
  
          // this.countryser.countryDetails().subscribe(res=>{
          //   this.countryList=res;
          //     console.log(this.countryList)
          //   });
          //   this.countryser.stateDetails().subscribe(res=>{
          //     this.stateList=res
          //   });
          //   this.countryser.cityDetails().subscribe(res=>{
          //     this.cityList=res
          //   })
    }
  
    get personal() { return this.personalDetails.controls; }
    
    // get address() { return this.addressDetails.controls; }
    
    // changeCountry(e: any) {
    //   this.countryName?.setValue(e.target.value, {
    //     onlySelf: true,
    //   });
    // }
    // changeState(e: any) {
    //   this.stateName?.setValue(e.target.value, {
    //     onlySelf: true,
    //   });
    // }
    // changeCity(e: any) {
    //   this.cityName?.setValue(e.target.value, {
    //     onlySelf: true,
    //   });
    // }

    // Access formcontrols getter
  
    get countryName() {
      return this.addressDetails.get('country');
    }
    get stateName() {
      return this.addressDetails.get('state');
    }
    get cityName() {
      return this.addressDetails.get('city');
    }
  

 
    // wizards------------
    stepStates = {
      normal: STEP_STATE.normal,
      disabled: STEP_STATE.disabled,
      error: STEP_STATE.error,
      hidden: STEP_STATE.hidden
    };
    
    config: NgWizardConfig = {
      selected: 0,
      theme: THEME.arrows,
      toolbarSettings: {
        toolbarExtraButtons: [
          { text: 'Finish', class: 'btn btn-info', event: () => { alert("Signup Successfully!!!"); 
          console.log(this.personalDetails.value);
          console.log();
          
          this.regiser.registration(this.personalDetails.value)
          // .subscribe(
            // res=>{
            //   alert("Signup Successfully");
            //   // this.personalDetails.reset();
            //   this.router.navigate(["public/login"]);
             
            

            //  },
            //  err=>{
            //   alert("something went wrong")
            // } )
             
           this.router.navigate(["public/login"]);
        }
         
         }
        ],
      }
    };
    
    
    
    
    showPreviousStep(event?: Event) {
      this.ngWizardService.previous();
    }
    
    showNextStep(event?: Event) {
      this.ngWizardService.next();
    }
    
    resetWizard(event?: Event) {
      this.ngWizardService.reset();
    }
    
    setTheme(theme: THEME) {
      this.ngWizardService.theme(theme);
    }
    
    stepChanged(args: StepChangedArgs) {
      console.log(args.step);
    }
    
    isValidTypeBoolean: boolean = true;
    
    isValidFunctionReturnsBoolean(args: StepValidationArgs) {
      return true;
    }
    
    isValidFunctionReturnsObservable(args: StepValidationArgs) {
      return of(true);
    }

    
    signup(){
      // alert("hello")

      const signupUser : Signup = this.personalDetails.value;
      
      console.log(this.personalDetails.value);
      this.regiser.registration(signupUser)
      .subscribe((response:any) => {
        console.log(response);
        // console.log(response.headers.get('header-key'));
        alert("Registered Successfully.")
        // this.router.navigate(["public/login"]);
        // this.router.navigate(["/login"]);
      })
          // .subscribe(
          //   res=>{
          //     alert("Signup Successfully");
          //     this.personalDetails.reset();
          //     this.router.navigate(["public/login"]);
             
            

          //    },
          //    err=>{
          //     alert("something went wrong")
          //   } )
             
          //  this.router.navigate(["public/login"]);
      
    }
}
