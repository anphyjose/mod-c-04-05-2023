import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';
import { RegistrationService } from '../../services/registration.service';


@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  personalDetails!: FormGroup;
 
  constructor(private ngWizardService: NgWizardService,
    private formBuilder: FormBuilder,
      private regser:RegistrationService,private router:Router
    ) { }

  ngOnInit(): void {
    this.personalDetails = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
     lastName: ['', Validators.required],
     emailAddress: ['', [Validators.required, Validators.email]],
     password: ['', Validators.required],
     phoneNo: [''],
      // address: ['', Validators.required],
   

    companyAddress: ['', Validators.required],
    companyName: ['', Validators.required],
    companyEmailAddress: ['', Validators.required],
    // organizationPhone: ['', Validators.required],
  });
  }
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
        { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!");
      // console.log(this.personalDetails.value);
      const signupUser :any = this.personalDetails.value;
      this.regser.registration(signupUser).subscribe((response:any) => {
        // console.log(response);
        // console.log(response.headers.get('header-key'));
        //alert("Registered Successfully.");
        this.router.navigate(["/login"]);
        })
       } }
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
}
