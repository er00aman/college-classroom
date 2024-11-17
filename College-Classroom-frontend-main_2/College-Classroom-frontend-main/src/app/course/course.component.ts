import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../shared/department/department.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{
  courseAdd = new FormGroup({
    departmentId : new FormControl(),
    courseName: new FormControl()
  })

  constructor(private router:Router,private courseService:CourseService,private toastr : ToastrService,private spinner:NgxSpinnerService, private deptservice :DepartmentService){}

  ngOnInit(): void {
    this.getAllDept()
  }

  allDept:any

  getAllDept(){
    this.deptservice.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDept = res.data
      }
    )
  }

add(){
  this.spinner.show()
  this.courseService.add(this.courseAdd.value).subscribe(
    (res:any)=>{
      if(res.success){
        this.spinner.hide()
        this.toastr.success(res.message)
        this.router.navigateByUrl('/layout/manage-course')
      }else{
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
