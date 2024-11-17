import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { SemesterService } from '../shared/semester/semester.service';
import { SubjectService } from '../shared/subject/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{

  subjectAdd = new FormGroup({
    departmentId : new FormControl(),
    courseId : new FormControl(),
    semesterId : new FormControl(),
    subjectName : new FormControl()
  })

  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private departmentService:DepartmentService,private courseService:CourseService,private semesterService:SemesterService,private subjectService:SubjectService){}

  ngOnInit(): void {
    this.getAllDepartment()
    this.getAllCourse()
    this.getAllSemester()
  }

  allDepartment:any
  getAllDepartment(){
    this.departmentService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepartment = res.data
      }
    )
  }

  allCourse:any
  getAllCourse(){
    this.courseService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allCourse = res.data
      }
    )
  }

  allSemester:any
  getAllSemester(){
    this.semesterService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allSemester = res.data
      }
    )
  }

  add(){
    this.spinner.show()
    this.subjectService.add(this.subjectAdd.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-subject')
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
