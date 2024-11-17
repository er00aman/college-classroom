import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  token:any
  apiUrl:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseUrl:any, private authService:AuthService) {
    this.apiUrl = _baseUrl
    this.token = authService.getToken()
  }

  add(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'student',form,{headers:headers_obj})
  }

  getSingle(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'studentGetSingle',form,{headers:headers_obj})
  }

  getAll(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'getAll',form,{headers:headers_obj})
  }
  update(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'studentUpdate',form,{headers:headers_obj})
  }

  block(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'studentBlock',form,{headers:headers_obj})
  }
}
