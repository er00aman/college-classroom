import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl:any

  constructor(private http:HttpClient,@Inject('baseurl')_baseurl:any) {
    this.apiUrl = _baseurl
  }

  admin(form:any){
    return this.http.post(this.apiUrl+'admin/login',form)
  }
}
