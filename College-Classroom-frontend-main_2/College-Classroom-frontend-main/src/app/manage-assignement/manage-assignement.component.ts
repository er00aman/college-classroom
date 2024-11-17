import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TeacherAssignmentServiceService } from '../shared/teacher-assignment-service/teacher-assignment-service.service';

@Component({
  selector: 'app-manage-assignement',
  templateUrl: './manage-assignement.component.html',
  styleUrls: ['./manage-assignement.component.css']
})
export class ManageAssignementComponent implements OnInit{

  constructor(private teacherAssignmentService:TeacherAssignmentServiceService){}

  ngOnInit(): void {
    this.getAllAssignment()
  }

  allAssignment:any
  getAllAssignment(){
    this.teacherAssignmentService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allAssignment = res.data
      }
    )
  }

  deleteUser(){
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
