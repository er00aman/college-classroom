import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TeacherService } from '../shared/teacher/teacher.service';

@Component({
  selector: 'app-manage-teacher',
  templateUrl: './manage-teacher.component.html',
  styleUrls: ['./manage-teacher.component.css']
})
export class ManageTeacherComponent implements OnInit{
  constructor(private teacherService:TeacherService){}

  ngOnInit(): void {
    this.getAllTeacher()
  }

  allTeacher:any
  getAllTeacher(){
    this.teacherService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allTeacher = res.data
      }
    )
  }

  deleteUser(id:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.teacherService.block({_id:id,status:false}).subscribe(
          (res:any)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllTeacher()
          }
        )
      }
    });
  }

}

