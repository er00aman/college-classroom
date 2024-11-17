import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../shared/course/course.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit{


  constructor(private router:Router, private courseService:CourseService, private activeRoute:ActivatedRoute, private spinner :NgxSpinnerService, private toastr: ToastrService, private department:DepartmentService){}

  updateCourse = new FormGroup({
    _id: new FormControl(),
    departmentId: new FormControl(),
    courseName: new FormControl()
  })

  ngOnInit(): void {
    this.updateCourse.patchValue({'_id':this.activeRoute.snapshot.paramMap.get('_id')})
    this.getSingleCourse()
    this.getAllDept()
  }


  allDept: any
  getAllDept(){
    this.department.getall({status:true}).subscribe(
      (res:any)=>{
        this.allDept = res.data
      },
      err=>{

      }
    )
  }


 getSingleCourse(){
  this.courseService.getSingle({_id:this.activeRoute.snapshot.paramMap.get('_id')}).subscribe(
    (res:any)=>{
      this.updateCourse.patchValue({'departmentId':res.data.departmentId._id})
      this.updateCourse.patchValue({'courseName':res.data.courseName})
    },
    err=>{

    }
  )
 }

  update(){
    this.spinner.show()
    this.courseService.update(this.updateCourse.value).subscribe(
      (res:any)=>{
        // console.log(res.data);

        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-course')
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
