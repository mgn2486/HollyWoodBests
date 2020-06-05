import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/User-Service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userDetails:any;
  firstName:string;
  lastName:string;
  initials:string;
  constructor(private route: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUserProfileDetails();    
  }

  private getUserProfileDetails() {
    this.userService.getUserClaims().subscribe(res => {
      this.userDetails = res;
      this.firstName = this.userDetails.FirstName;
      this.lastName = this.userDetails.LastName;
      this.initials = this.userDetails.Initials;
    }, err => {
      console.log(err);
    });
  }

  onLogout(){
    localStorage.removeItem('userToken');
    this.route.navigate(['./login'])
  }

}
