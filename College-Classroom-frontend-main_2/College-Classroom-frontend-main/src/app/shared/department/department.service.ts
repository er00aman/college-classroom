import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl:any
  token:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseurl:any, private authService:AuthService) {
    this.apiUrl= _baseurl
    this.token= this.authService.getToken()
  }

  add(form:any){
    var headers_obj = new HttpHeaders().set('authorization', this.token)
    return this.http.post(this.apiUrl+'department/add',form, {headers:headers_obj})
  }

  update(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'department/Update',form, {headers:headers_obj})
  }
  getall(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'department/GetAll',form, {headers:headers_obj})
  }
  getsingle(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'department/GetSingle',form, {headers:headers_obj})
  }
  delete(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'department/Delete',form, {headers:headers_obj})
  }

  block(form:any){
    var headers_obj = new HttpHeaders().set('authorization',this.token)
    return this.http.post(this.apiUrl+'department/Block',form, {headers:headers_obj})
  }
}
