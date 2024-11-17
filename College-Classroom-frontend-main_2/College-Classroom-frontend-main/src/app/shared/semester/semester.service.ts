import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  apiUrl:any
  token:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseUrl:any,private authService:AuthService){
    this.apiUrl = _baseUrl
    this.token = this.authService.getToken()
  }

  add(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'semester',form,{headers:headers_obj})
  }

  getSingle(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'semesterGetSingle',form,{headers:headers_obj})
  }

  getAll(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'semesterGetAll',form,{headers:headers_obj})
  }

  update(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'semesterUpdate',form,{headers:headers_obj})
  }

  block(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'semesterBlock',form,{headers:headers_obj})
  }

}
