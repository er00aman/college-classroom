import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { TeacherService } from '../shared/teacher/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{
  addTeacher = new FormGroup({
    departmentId : new FormControl(),
    courseId : new FormControl(),
    teacherName : new FormControl(),
    teacherDesignation : new FormControl(),
    createdAt : new FormControl(),
    workExperience : new FormControl(),
    teacherRegisterEmail : new FormControl(),
    password : new FormControl()
  })

  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private departmentService:DepartmentService,private courseService:CourseService,private teacherService:TeacherService){}

  ngOnInit(): void {
    this.getAllCourse()
    this.getAllDepartment()
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

  add(){
    this.spinner.show()
    this.teacherService.add(this.addTeacher.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-teacher')
        }else{
          this.toastr.error(res.message)
          this.spinner.hide()
        }
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }
}
