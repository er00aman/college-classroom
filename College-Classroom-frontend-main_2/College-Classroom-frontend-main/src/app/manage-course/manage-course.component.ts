import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CourseService } from '../shared/course/course.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit{

  constructor(private courseService: CourseService){

  }

  ngOnInit(): void {
    this.getAllCourse()
  }

  allCourse:any
  getAllCourse(){
    this.courseService.getall({status:true}).subscribe(
      (res:any)=>{
        this.allCourse = res.data
      }
    )
  }

  deleteuser(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#687a8b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.block({_id:id,status:false}).subscribe(
          (res:any)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllCourse()
          }
        )
      }
    });
  }
}
