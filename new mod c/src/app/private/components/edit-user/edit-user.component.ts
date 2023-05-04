import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  personalDetails!: FormGroup;
  response: any
  constructor(private formBuilder: FormBuilder, private router: ActivatedRoute, private userservice: UserService,
    private rout: Router) { }

  ngOnInit(): void {
    const id: string = this.router.snapshot.params['id'];
    console.log(this.router.snapshot.params['id']);
    this.userservice.getUserById(id).subscribe((result) => {
      this.response = result;
      console.log(this.response);
      this.personalDetails = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        userName: ['', Validators.required],
        emailAddress: ['', Validators.required, Validators.email],
        phoneNo: ['', Validators.required],
        role: ['', Validators.required],

      });
    })

  }
  update() {
    this.userservice.updateUser(this.router.snapshot.params['id'], this.personalDetails.value).subscribe(result => {
      console.log('updated successfully');
      this.rout.navigate(["/dashboard"]).then(() => {
        window.location.reload();

      }
      )
    

  })
}
}

