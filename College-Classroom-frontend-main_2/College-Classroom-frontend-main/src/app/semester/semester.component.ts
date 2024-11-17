import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemesterService } from '../shared/semester/semester.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit{
  semesterAdd = new FormGroup({
    departmentId : new FormControl(),
    courseId : new FormControl(),
    semester : new FormControl()
  })

  constructor(private router:Router, private semesterService:SemesterService, private toastr:ToastrService, private spinner:NgxSpinnerService, private department:DepartmentService, private course:CourseService){}

  ngOnInit(): void {
    this.getAllDepartment()
    this.getAllCourse()
  }

  allDepartment:any
  getAllDepartment(){
    this.department.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepartment = res.data
      }
    )
  }

  allCourse:any
  getAllCourse(){
    this.course.getall({status:true}).subscribe(
      (res:any)=>{
        this.allCourse = res.data
      }
    )
  }


  add(){
    this.spinner.show()
    this.semesterService.add(this.semesterAdd.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-semester')
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
