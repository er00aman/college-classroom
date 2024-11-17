import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { StudentService } from '../shared/student/student.service';
import { SemesterService } from '../shared/semester/semester.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  allStudent = new FormGroup({
    departmentId: new FormControl(),
    courseId: new FormControl(),
    semesterId: new FormControl(),
    studentName: new FormControl(),
    studentEmail: new FormControl(),
    password: new FormControl(),
    universityRollNo: new FormControl(),
    cRollNo: new FormControl()
  })
  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private departmentService:DepartmentService,private courseService:CourseService,private semesterService:SemesterService,private studentService:StudentService){}

  ngOnInit(): void {
    this.getAllDepart()
    this.getAllCourse()
    this.getAllSemester()
  }

  allDepart:any
  getAllDepart(){
    this.departmentService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepart = res.data
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  allCourse:any
  getAllCourse(){
    this.courseService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allCourse= res.data
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  allSemester:any
  getAllSemester(){
    this.semesterService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allSemester = res.data
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  add(){
    this.spinner.show()
    this.studentService.add(this.allStudent.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-student')
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
