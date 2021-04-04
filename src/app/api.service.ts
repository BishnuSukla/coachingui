import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectService } from './subject.service';

const url = "http://localhost:3001";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http:HttpClient,private _subjectService:SubjectService) { }

  login(userCredential){
    return this.http.post(url+"/api/login",userCredential);
  }
  logout(){
    localStorage.removeItem('token');
    this._subjectService.updateSource(false);
  }
  getAboutUs(){
    return this.http.get(url+"/api/get-aboutus");
  }
  createAboutUs(aboutus){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.put(url+"/api/create-aboutus",{aboutus},{headers}); 
  }
  updateAboutUs(aboutus){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.patch(url+"/api/update-aboutus",{aboutus},{headers}); 
  }
  createNotification(notification){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.put(url+"/api/create-notification",{notification},{headers}); 
  }
  getNotifications(){
    return this.http.get(url+"/api/get-notifications");
  }
  updateNotification(notification){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.patch(url+"/api/update-notification",{notification},{headers}); 
  }
  deleteNotification(notificationId){
    const options = {
      headers:new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json"),
      body:{notificationId}
    }
    return this.http.request('delete',url+"/api/delete-notification",options); 
  }
  createCourse(course){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.put(url+"/api/create-course",{course},{headers}); 
  }
  getCourse(){
    return this.http.get(url+"/api/get-courses");
  }
  updateCourse(course){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.patch(url+"/api/update-course",{course},{headers}); 
  }
  deleteCourse(courseId){
    const options = {
      headers:new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json"),
      body:{courseId}
    }
    return this.http.request('delete',url+"/api/delete-course",options); 
  }
}


