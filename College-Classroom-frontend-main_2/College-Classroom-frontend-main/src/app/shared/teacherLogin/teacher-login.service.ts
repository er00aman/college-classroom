import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherLoginService {

  apiUrl: any

  constructor(private http:HttpClient,@Inject('baseurl')_baseurl:any) {
    this.apiUrl = _baseurl
  }

  teacherLogin(form:any){
    return this.http.post(this.apiUrl+'loginTeacher',form)
  }
}
