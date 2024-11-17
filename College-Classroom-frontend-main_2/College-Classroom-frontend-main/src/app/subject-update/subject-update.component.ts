import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../shared/department/department.service';
import { CourseService } from '../shared/course/course.service';
import { SemesterService } from '../shared/semester/semester.service';
import { SubjectService } from '../shared/subject/subject.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css']
})
export class SubjectUpdateComponent implements OnInit{

  constructor(private spinner:NgxSpinnerService, private toastr:ToastrService, private router:Router, private activatedRoute:ActivatedRoute, private departmentService:DepartmentService, private courseService:CourseService, private semesterService:SemesterService, private subjectService:SubjectService){}


  updateSubject = new FormGroup({
    _id: new FormControl(),
    departmentId: new FormControl(),
    courseId: new FormControl(),
    semesterId: new FormControl(),
    subjectName : new FormControl()
  })

  ngOnInit(): void {
    this.updateSubject.patchValue({'_id':this.activatedRoute.snapshot.paramMap.get('_id')})
    this.getAllDepart()
    this.getAllCourse()
    this.getAllSemester()
    this.getAllSub()
  }

  allDepart : any
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

  getAllSub(){
    this.subjectService.getSingle({_id:this.activatedRoute.snapshot.paramMap.get('_id')}).subscribe(
      (res:any)=>{
        this.updateSubject.patchValue({'departmentId':res.data.departmentId._id})
        this.updateSubject.patchValue({'courseId':res.data.courseId._id})
        this.updateSubject.patchValue({'semesterId':res.data.semesterId._id})
        this.updateSubject.patchValue({'subjectName':res.data.subjectName})
      }
    )
  }

  update(){
    this.spinner.show()
    this.subjectService.update(this.updateSubject.value).subscribe(
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
      (err)=>{
        this.toastr.error(err)
      }
    )
  }
}
