import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubjectService } from '../shared/subject/subject.service';

@Component({
  selector: 'app-managet-subject',
  templateUrl: './managet-subject.component.html',
  styleUrls: ['./managet-subject.component.css']
})
export class ManagetSubjectComponent implements OnInit{
  constructor(private subjectService:SubjectService) {

  }

  ngOnInit(): void {
    this.getAllSubject()
  }

  allSubject:any
  getAllSubject(){
    this.subjectService.getAll({status:true}).subscribe(
      (res:any)=>{
        this.allSubject = res.data
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
        this.subjectService.block({_id:id,status:false}).subscribe(
          (res:any)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.getAllSubject()
          }
        )
      }
    });
  }
}



