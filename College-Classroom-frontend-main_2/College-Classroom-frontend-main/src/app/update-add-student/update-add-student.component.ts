import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { SemesterService } from '../shared/semester/semester.service';
import { StudentService } from '../shared/student/student.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-add-student',
  templateUrl: './update-add-student.component.html',
  styleUrls: ['./update-add-student.component.css']
})
export class UpdateAddStudentComponent implements OnInit{

  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private activatedRoute:ActivatedRoute,private departmentService:DepartmentService,private courseService:CourseService,private semesterService:SemesterService,private studentService:StudentService){}

  updateStudent = new FormGroup({
    _id:new FormControl(),
    departmentId:new FormControl(),
    courseId:new FormControl(),
    semesterId:new FormControl(),
    studentName:new FormControl(),
    universityRollNo:new FormControl(),
    cRollNo:new FormControl(),
  })

  ngOnInit(): void {
    this.updateStudent.patchValue({'_id':this.activatedRoute.snapshot.paramMap.get('_id')})
    this.getAllDepartment()
    this.getAllCourse()
    this.getAllSemester()
    this.getSingleStudent()
  }

  allDepart:any
  getAllDepartment(){
    this.departmentService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepart=res.data
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
        this.allCourse=res.data
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
        this.allSemester=res.data
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  getSingleStudent(){
    this.studentService.getSingle({_id:this.activatedRoute.snapshot.paramMap.get('_id')}).subscribe(
      (res:any)=>{
        this.updateStudent.patchValue({'departmentId':res.data.departmentId._id})
        this.updateStudent.patchValue({'courseId':res.data.courseId._id})
        this.updateStudent.patchValue({'semesterId':res.data.semesterId._id})
        this.updateStudent.patchValue({'studentName':res.data.studentName})
        this.updateStudent.patchValue({'universityRollNo':res.data.universityRollNo})
        this.updateStudent.patchValue({'cRollNo':res.data.cRollNo})
      }
    )
  }

  update(){
    this.spinner.show()
    this.studentService.update(this.updateStudent.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-student')
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
