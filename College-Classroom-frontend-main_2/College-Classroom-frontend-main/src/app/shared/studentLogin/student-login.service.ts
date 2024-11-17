import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentLoginService {

  apiUrl:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseurl:any){
    this.apiUrl = _baseurl
  }


  studentLogin(form:any){
    return this.http.post(this.apiUrl+'studentLogin',form)
  }
}
