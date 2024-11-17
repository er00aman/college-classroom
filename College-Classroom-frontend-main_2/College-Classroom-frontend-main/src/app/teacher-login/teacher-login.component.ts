import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth/auth.service';
import { TeacherLoginService } from '../shared/teacherLogin/teacher-login.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit{
  teacher = new FormGroup({
    teacherRegisterEmail : new FormControl(),
    password : new FormControl()
  })

  constructor (private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private teacherLoginService:TeacherLoginService,private authService:AuthService){}

  ngOnInit(): void {

  }

  login(){
    this.spinner.show()
    this.teacherLoginService.teacherLogin(this.teacher.value).subscribe(
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
