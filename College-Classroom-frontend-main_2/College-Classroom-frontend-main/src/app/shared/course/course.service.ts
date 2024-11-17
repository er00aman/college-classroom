import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl:any
  token:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseurl:any, private authService:AuthService) {
    this.apiUrl= _baseurl
    this.token= this.authService.getToken()
  }

  add(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'course',form, {headers:headers_obj})
  }

  update(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'courseUpdate',form, {headers:headers_obj})
  }
  getall(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'courseGetAll',form, {headers:headers_obj})
  }
  getSingle(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'course/GetSingle',form, {headers:headers_obj})
  }
  delete(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'courseDelete',form, {headers:headers_obj})
  }

  block(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'courseBlock',form, {headers:headers_obj})
  }
}
