import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(form:any){
    localStorage.setItem('teacherEmail',form.data.teacherRegisterEmail)
    localStorage.setItem('studentEmail',form.data.studentEmail)
    localStorage.setItem('email',form.data.email)
    localStorage.setItem('Token',form.token)
    localStorage.setItem('userType',form.data.userType)
  }

  getTeacherEmail(){
    return localStorage.getItem('teacherEmail')
  }
  getStudentEmail(){
    return localStorage.getItem('studentEmail')
  }
  getEmail(){
    return localStorage.getItem('email')
  }

  getToken(){
    return localStorage.getItem('Token')
  }

  getUserType(){
    return localStorage.getItem('userType')
  }

  removeData(){
    localStorage.clear()
  }
}
