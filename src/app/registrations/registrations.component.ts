import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  registeredStudentList:any;
  userLoggedIn:any;
 
  constructor(private _apiService:ApiService, private _subjectService:SubjectService) {

  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
    this.registeredStudentList  = [];
    this._apiService.getstudentRegister().subscribe((val)=>{
      if(val['data']){
        this.registeredStudentList = val['data'];
      }
    },response=>{
      console.log(response);
    })
  }

}
