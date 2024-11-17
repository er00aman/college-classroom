import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private authService : AuthService, private router: Router,){}

  email:any
  userType:any

  teacherRegisterEmail:any

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false

    // console.log(this.authService.getEmail())
    // console.log(this.authService.getUserType())

    if(this.authService.getTeacherEmail() != null)
    {
      this.email = this.authService.getTeacherEmail()
    }

    if(this.authService.getStudentEmail() != null){
      this.teacherRegisterEmail = this.authService.getStudentEmail()
    }

    if(this.authService.getEmail() != null){
      this.email = this.authService.getEmail()
    }

    if(this.authService.getUserType() != null)
    {
      this.userType = this.authService.getUserType()
    }



  }

  logout(){
    this.authService.removeData()
    this.router.navigateByUrl ('/layout/admin-login')
  }


}
