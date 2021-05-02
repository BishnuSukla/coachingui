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
  validateRegistration:any;
  registerSubmitbtnDisabled:boolean;
  constructor(private _apiService:ApiService, private _subjectService:SubjectService,private toastr: ToastrService) {
    this.filterArgs1 = '';
    this.selectedStudent = {
      name:'',
      address:'',
      mobile:null,
      email:'',
      class:'',
      subjects:'',
      tuitionType:''
    }
    this.registerSubmitbtnDisabled = true;
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
    this.validateRegistration = {
      name:"",
      emailId:"",
      mobileNo:null,
      address:"",
      subject:"",
      tuitionType:"",
      class:""
    }
  }
  setStudentToBeUpdated(studentId){
    this.selectedStudent = _.cloneDeep(_.find(this.registeredStudentList,{registrationId:studentId}));
    this.registerSubmitbtnDisabled = true;
  }
  disableBtn(){
    this.registerSubmitbtnDisabled = this.validateRegistrationData();
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
      mobile:null,
      email:'',
      class:'',
      subjects:'',
      tuitionType:''
    }
  }
  stateChange(state){
    if(updateBtnState.includes(state)){
      this.operation='Update';
      this.selectedStudent.status = state;
      this.onSave(undefined);
      $('#viewStdDetails').modal('hide');
    }else if(deleteBtnState.includes(state)){
      let stdregId = this.selectedStudent.registrationId;
      this.setFlagAndData('Delete');
      this.setStudentToBeUpdated(stdregId);
      this.selectedStudent.status = state;
      $('#viewStdDetails').modal('hide');
      $('#confirmModal').modal('show');
    }else{
      return;
    }
    
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
  validateRegistrationData(){
    let flag = false;
    if(this.selectedStudent.name.trim() == this.validateRegistration.name){
      $('#regStdName').addClass('is-invalid');
      flag = true;
    }else{
      $('#regStdName').removeClass('is-invalid');
    }
    if(this.selectedStudent.emailId){
      if(!this._apiService.isValidEmail(this.selectedStudent.emailId)){
        $('#regStdEmail').addClass('is-invalid');
        flag = true;
      }else{
        $('#regStdEmail').removeClass('is-invalid');
      }
    }
    if(!this._apiService.isValidPhone(String(this.selectedStudent.mobileNo))){
      $('#regStdMobile').addClass('is-invalid');
      flag = true;
    }else{
      $('#regStdMobile').removeClass('is-invalid');
    }
    if(this.selectedStudent.address.trim() == this.validateRegistration.address){
      $('#regStdAddress').addClass('is-invalid');
      flag = true;
    }else{
      $('#regStdAddress').removeClass('is-invalid');
    }
    if(this.selectedStudent.class.trim() == this.validateRegistration.class){
      $('#regStdClass').addClass('is-invalid');
      flag = true;
    }else{
      $('#regStdClass').removeClass('is-invalid');
    }
    return flag;
  }

}
