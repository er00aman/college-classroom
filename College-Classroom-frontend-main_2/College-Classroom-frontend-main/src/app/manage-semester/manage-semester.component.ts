import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SemesterService } from '../shared/semester/semester.service';

@Component({
  selector: 'app-manage-semester',
  templateUrl: './manage-semester.component.html',
  styleUrls: ['./manage-semester.component.css']
})
export class ManageSemesterComponent implements OnInit{
  constructor(private semesterService:SemesterService) {

  }

  ngOnInit(): void {
    this.getAllSemester()
  }
  allSemester:any

  getAllSemester(){
    this.semesterService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allSemester = res.data
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
        this.semesterService.block({_id:id,status:false}).subscribe(
          (res:any)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllSemester()
          }
        )
      }
    });
  }
}
