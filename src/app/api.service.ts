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
  studentRegister(register){
    return this.http.post(url+"/api/registration",{register}); 
  }
  getStudentRegister(){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.get(url+"/api/get-registrations",{headers}); 
  }
  // deleteStudent(studentId){
  //   const options = {
  //   headers:new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json"),
  //   body:{studentId}
  // }
  //   return this.http.request(url+"/api/delete-registration",options); 
  // }
  updateStudent(student){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.patch(url+"/api/update-registration",{student},{headers}); 
  }
  createFaculty(faculty){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.put(url+"/api/create-faculty",{faculty},{headers}); 
  }
  getFaculty(){
    return this.http.get(url+"/api/get-faculties");
  }
  updateFaculty(faculty){
    let headers = new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json");;
    return this.http.patch(url+"/api/update-faculty",{faculty},{headers}); 
  }
  deleteFaculty(facultyId){
    const options = {
      headers:new HttpHeaders().set("token", localStorage.getItem('token')).set("Content-Type", "application/json"),
      body:{facultyId}
    }
    return this.http.request('delete',url+"/api/delete-faculty",options); 
  }
}


