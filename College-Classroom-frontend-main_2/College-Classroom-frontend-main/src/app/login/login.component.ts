import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login/login.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  adminLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  constructor(private router:Router, private toastr:ToastrService, private spinner:NgxSpinnerService, private loginService:LoginService, private authService:AuthService){}

  ngOnInit(): void {

  }

  login(){
    this.spinner.show()
    this.loginService.admin(this.adminLogin.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.authService.setData(res)
          this.router.navigateByUrl('/layout/home')
        }
        else{
          this.toastr.error(res.message)
          this.spinner.hide()
        }
      },
      err=>{
        this.toastr.error(err)
      }
    )
  }

}
