import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../shared/department/department.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit{

  updatedept = new FormGroup({
    _id: new FormControl(),
    name: new FormControl()
  })

  constructor(private router:Router, private departmentservice:DepartmentService, private toastr:ToastrService, private spinner: NgxSpinnerService, private activatedroute:ActivatedRoute){}

  ngOnInit(): void {
    this.updatedept.patchValue({'_id':this.activatedroute.snapshot.paramMap.get('_id')})
    this.getSingleData()
  }

  getSingleData(){
    this.departmentservice.getsingle({_id:this.activatedroute.snapshot.paramMap.get('_id')}).subscribe(
      (res:any)=>{
        this.updatedept.patchValue({'name':res.data.name})
      }
    )
  }

  update(){
    this.spinner.show()
    this.departmentservice.update(this.updatedept.value).subscribe(
      (res:any)=>{
        if(res.success){
          this.spinner.hide()
          this.toastr.success(res.message)
          this.router.navigateByUrl('/layout/manage-department')
        }
        else{
          this.spinner.hide()
          this.toastr.error(res.message)
        }
      },
      err=>{
        this.toastr.error(err)
      }
    )
  }

}
