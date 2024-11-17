import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../shared/department/department.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{

  department= new FormGroup({
    name: new FormControl()
  })


  constructor(private router:Router, private departmentservice:DepartmentService, private toastr:ToastrService, private spinner:NgxSpinnerService){}


  ngOnInit(): void {

  }

  add(){
    this.spinner.show()
    this.departmentservice.add(this.department.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.toastr.success(res.message)
          this.spinner.hide()
          this.router.navigateByUrl('/layout/manage-department')
        }
        else{
          this.spinner.hide()
          this.toastr.error(res.message)
        }
      },
      err=>{
        this.toastr.error(err)
      }
    )
  }

}
