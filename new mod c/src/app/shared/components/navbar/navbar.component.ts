import { Component, OnInit } from '@angular/core';
import { PublicUserService } from 'src/app/private/services/public-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userList: any
  userName: any = localStorage.getItem('username');
  constructor(private publicuserser:PublicUserService ) { }
  

  ngOnInit(): void {
    this.publicuserser.users().subscribe((res: any) => {
      this.userList = res;
      // console.log(this.userList.id);
      localStorage.setItem('id', this.userList.id);
      localStorage.setItem('companyid', this.userList.companyId);
      localStorage.setItem('companyname', this.userList.companyName);


      console.log(this.userList)
    }
  )}
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  

  public textShow = true;
  showText(){
    this.textShow = true;
   }
   hideText(){
    this.textShow = false;
   }
}
