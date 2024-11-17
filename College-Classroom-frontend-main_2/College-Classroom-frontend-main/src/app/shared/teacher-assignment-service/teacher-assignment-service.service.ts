import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherAssignmentServiceService implements OnInit{

  apiUrl:any
  token:any
  constructor(private http:HttpClient,@Inject('baseurl')_baseUrl:any, private authService:AuthService) {
    this.apiUrl = _baseUrl
    this.token = authService.getToken()
  }

  ngOnInit(): void {

  }

  add(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'teacherAssignment',form,{headers:headers_obj})
  }

  getSingle(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'AssignmentGetSingle',form,{headers:headers_obj})
  }

  getAll(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'AssignmentGetAll',form,{headers:headers_obj})
  }

  update(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'AssignmentUpdate',form,{headers:headers_obj})
  }

  delete(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'teacherAssignmentDelete',form,{headers:headers_obj})
  }

}
