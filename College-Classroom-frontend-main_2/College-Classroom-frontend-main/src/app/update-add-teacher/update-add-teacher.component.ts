import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { TeacherService } from '../shared/teacher/teacher.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-add-teacher',
  templateUrl: './update-add-teacher.component.html',
  styleUrls: ['./update-add-teacher.component.css']
})
export class UpdateAddTeacherComponent implements OnInit{
  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,private router:Router,private activatedRoute:ActivatedRoute,private departmentService:DepartmentService,private courseService:CourseService,private teacherService:TeacherService){}

  updateTeacher = new FormGroup({
    _id: new FormControl(),
    departmentId: new FormControl(),
    courseId: new FormControl(),
    teacherName: new FormControl(),
    teacherDesignation: new FormControl(),
    workExperience: new FormControl()
  });

  ngOnInit(): void {
    this.updateTeacher.patchValue({'_id':this.activatedRoute.snapshot.paramMap.get('_id')})
    this.getAllDepartment()
    this.getAllCourse()
    this.getSingleTeacher()
  }

  allDepart:any
  getAllDepartment(){
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
        this.allCourse = res.data
      }
    )
  }

  getSingleTeacher(){
    this.teacherService.getSingle({_id:this.activatedRoute.snapshot.paramMap.get('_id')}).subscribe(
      (res:any)=>{
        this.updateTeacher.patchValue({'departmentId':res.data.departmentId._id})
        this.updateTeacher.patchValue({'courseId':res.data.courseId._id})
        this.updateTeacher.patchValue({'teacherName':res.data.teacherName})
        this.updateTeacher.patchValue({'teacherDesignation':res.data.teacherDesignation})
        this.updateTeacher.patchValue({'workExperience':res.data.workExperience})
        console.log(res.data)
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  update(){
    this.spinner.show()
    this.teacherService.update(this.updateTeacher.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-teacher')
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
