import { AuthService } from './../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudentLoginService } from '../shared/studentLogin/student-login.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit{

studentLogin = new FormGroup({
  universityRollNo : new FormControl(),
  password : new FormControl()
})

  constructor(private router:Router, private spinner:NgxSpinnerService, private toastr:ToastrService, private studentLoginService:StudentLoginService, private authService:AuthService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  login(){
    this.spinner.show()
    this.studentLoginService.studentLogin(this.studentLogin.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.authService.setData(res)
          this.router.navigateByUrl('/layout/home')
        }else{
          this.spinner.hide()
          this.toastr.error(res.message)
        }
      },
      (err)=>{
        this.spinner.hide()
        this.toastr.error(err)
      }
    )
  }
}
