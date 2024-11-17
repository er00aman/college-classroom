import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { SemesterService } from '../shared/semester/semester.service';
import { SubjectService } from '../shared/subject/subject.service';
import { TeacherAssignmentServiceService } from '../shared/teacher-assignment-service/teacher-assignment-service.service';

@Component({
  selector: 'app-teacher-assignment',
  templateUrl: './teacher-assignment.component.html',
  styleUrls: ['./teacher-assignment.component.css']
})
export class TeacherAssignmentComponent implements OnInit{

  uploadAssignment =  new FormGroup({
    departmentId : new FormControl(),
    courseId : new FormControl(),
    semesterId : new FormControl(),
    subjectId : new FormControl(),
    file:new FormControl(),
    writeAssignment:new FormControl(),
    assignmentNumber:new FormControl()
  })

  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private departmentService:DepartmentService,private courseService : CourseService,private semesterService:SemesterService,private subjectService:SubjectService,private teacherAssignmentService:TeacherAssignmentServiceService){}

  ngOnInit(): void {
    this.getAllDepart()
    this.getAllCourse()
    this.getAllSemester()
    this.getAllSubject()
  }
  allDepart:any
  getAllDepart(){
    this.departmentService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepart= res.data
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
        this.allSemester= res.data
      }
    )
  }

  allSubject:any
  getAllSubject(){
    this.subjectService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allSubject = res.data
      }
    )
  }

  add(){
    this.spinner.show()
    this.teacherAssignmentService.add(this.uploadAssignment.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-assignment')
        }else{
          this.spinner.hide()
          this.toastr.error(res.message)
        }
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }
}
