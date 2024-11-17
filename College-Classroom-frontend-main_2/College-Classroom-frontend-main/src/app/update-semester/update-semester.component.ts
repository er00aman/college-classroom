import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SemesterService } from '../shared/semester/semester.service';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-update-semester',
  templateUrl: './update-semester.component.html',
  styleUrls: ['./update-semester.component.css']
})
export class UpdateSemesterComponent implements OnInit{



  constructor(private router:Router,private spinner:NgxSpinnerService,private toastr:ToastrService,private departmentService:DepartmentService,private courseService:CourseService,private activeRoutes:ActivatedRoute,private semesterService:SemesterService, private authservice:AuthService){}

  updateSemester = new FormGroup({
    _id : new FormControl(),
    departmentId : new FormControl(),
    courseId : new FormControl(),
    semester: new FormControl()
  })

  ngOnInit(): void {
    this.updateSemester.patchValue({'_id':this.activeRoutes.snapshot.paramMap.get('_id')})
    this.getAllDepartment()
    this.getAllCourse()
    this.getSingleSemester()
  }

  allDepartment:any
  getAllDepartment(){
    this.departmentService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDepartment = res.data
      },
      err=>{

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

  getSingleSemester(){
    this.semesterService.getSingle({_id:this.activeRoutes.snapshot.paramMap.get('_id')}).subscribe(
      (res:any)=>{
        this.updateSemester.patchValue({'departmentId':res.data.departmentId._id})
        this.updateSemester.patchValue({'courseId':res.data.courseId._id})
        this.updateSemester.patchValue({'semester':res.data.semester})
      },
      err=>{

      }
    )
   }


  updateSem(){
    this.spinner.show()
    this.semesterService.update(this.updateSemester.value).subscribe(
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
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

}
