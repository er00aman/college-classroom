import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StudentService } from '../shared/student/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit{

  constructor(private studentService:StudentService,private toastr:ToastrService){}

  ngOnInit(): void {
    this.getAllStudent()
  }


  allStudent:any
  getAllStudent(){
    this.studentService.getAll({status:true}).subscribe(
      (res:any)=>{
        console.log(res.data)
        this.allStudent = res.data
      },
      (err)=>{
        this.toastr.error(err)
      }
    )
  }

  deleteUser(id:any){
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
        this.studentService.block({_id:id,status:false}).subscribe(
          (res:any)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllStudent()
          }
        )
      }
    });
  }

}
