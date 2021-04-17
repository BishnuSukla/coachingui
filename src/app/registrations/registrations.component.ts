import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
import {tabs,btnstate,bsclass,updateBtnState,deleteBtnState} from './registration.state';
declare var $:any;

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  registeredStudentList:any;
  userLoggedIn:any;
  filterArgs1:string;
  operation:string;
  selectedStudent:any;
  removeText:string;
  activeTab:string;
  buttons:any;
  constructor(private _apiService:ApiService, private _subjectService:SubjectService,private toastr: ToastrService) {
    this.filterArgs1 = '';
    this.selectedStudent = {
      name:'',
      address:'',
      mobile:0,
      email:'',
      class:'',
      subjects:'',
      tuitionType:''
    }
  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
    this.registeredStudentList  = [];
    this._apiService.getStudentRegister("").subscribe((val)=>{
      if(val['data']){
        this.registeredStudentList = val['data'];
      }
    },response=>{
      console.log(response);
    })
    this.setTab('');
  }
  setStudentToBeUpdated(studentId){
    this.selectedStudent = _.cloneDeep(_.find(this.registeredStudentList,{registrationId:studentId}));
  }

  setTab(activeTab){
    this.activeTab = activeTab;
    let buttonsForTab = tabs[activeTab];
    if(buttonsForTab){
      let obj = {};
      for(let i=0;i< buttonsForTab.length;i++){
        obj[buttonsForTab[i]] = {
          state:btnstate[buttonsForTab[i]],
          bsClass:bsclass[buttonsForTab[i]]
        }
      }
      this.buttons = obj;
      console.log(this.buttons);
    }
    this._apiService.getStudentRegister(this.activeTab).subscribe((val)=>{
      if(val['data']){
        this.registeredStudentList = val['data'];
      }
    },response=>{
      console.log(response);
    })
  }

  setFlagAndData(val){
     this.operation = val;
     this.removeText ="registration";
     this.selectedStudent = {
      name:'',
      address:'',
      mobile:0,
      email:'',
      class:'',
      subjects:'',
      tuitionType:''
    }
  }
  stateChange(state){
    if(updateBtnState.includes(state)){
      this.operation='Update';
    }else if(deleteBtnState.includes(state)){
      this.operation='Delete';
    }else{
      return;
    }
    this.selectedStudent.status = state;
    this.onSave(undefined);
    $('#viewStdDetails').modal('hide');
  }
  onSave(data){
     if(this.operation=='Update'){
      this._apiService.updateRegisteredStudent(this.selectedStudent).subscribe((val)=>{
        this._apiService.getStudentRegister(this.activeTab).subscribe((val)=>{
          if(val['data']){
            this.registeredStudentList = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Registrations updated successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.operation == 'Delete'){
      this._apiService.deletetudentRegister(this.selectedStudent.registrationId).subscribe((val)=>{
        this._apiService.getStudentRegister(this.activeTab).subscribe((val)=>{
          if(val['data']){
            this.registeredStudentList = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Registration deleted successfully', 'Success');
      },response=>{
        console.log(response)
          this.toastr.error('Delete failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }
    $('#editStudent').modal('hide');
  }

}
