import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Signup } from '../../models/signup';
import { PublicRegistrationService } from '../../services/public-registration.service';
import { PublicUserService } from '../../services/public-user.service';

@Component({
  selector: 'app-public-user-profile',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.css']
})
export class PublicUserProfileComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  // myGroup!:FormGroup
  userList = new Signup;
  id:any;
  file:any;
  userName: any = localStorage.getItem('username');
  companyUserName:any = localStorage.getItem('companyUserName');
    constructor(private registerser:PublicRegistrationService,private router:Router, private activaterouter: ActivatedRoute,) { }
  
    ngOnInit(): void { 
    
      
      this.activaterouter.params.subscribe( params => this.id=params['id']);
      console.log(this.id);
      
      this.registerser.companyUsers(this.id).subscribe((res: any)=>{
         this.userList=res;
        console.log(this.userList)
         console.log(this.userList.id);
    console.log(this.companyUserName);
      console.log(this.id);
      
        localStorage.setItem('id',this.userList.id);
        console.log(this.userList)
      })
    //   alert(users.userName)
    //  console.log(users.userName);
     
    }
    handleSubmit(formdata: NgForm) {
      // this.service.UpdateStudent(this.id, formdata.value)
      //   .subscribe(
      //     data => {
      //       this.submitted = true;
      //       console.log("updated");
  
      //     }
      //   )
      console.log("updated");
    }
    ngOnLoad(){
      // this.userser.users().subscribe((res: any)=>{
      //   this.userList=res;
      //   // console.log(this.userList.id);
      //   localStorage.setItem('id',this.userList.id);
      //   console.log(this.userList)
      // })
    }
    // logout(){
    //   // this.authService.logout().subscribe({
    //   //   next: res => {
    //   //     console.log(res);
    //   //     this.storageService.clean();
  
    //   //     window.location.reload();
    //   //   },
    //   //   error: err => {
    //   //     console.log(err);
    //   //   }
    //   // });
    //   this.userser.logout();
    //   this.router.navigate (['/login'])
      
    // }
  
  
    save(){
      alert("file uploaded..."+this.file);
console.log(this.userList.id);
console.log(this.file);


      var formData=new FormData();
      // formData.append('image',this.file);
    
      this.registerser.userProfile(this.file,this.userList.id)
      //  this.router.navigate(['/profile',{ id:  this.userList.id}])
    }
    getFile(event:any){
      alert("hi");
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        // Fill file variable with the file content
        this.file = event.target.files[0];
      }
      // this.file= event.target.files[0]
      console.log("file"+this.file.name);
      // this.save(this.file)
    }
}
