import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ApiService } from '../api.service';
import { Course } from './course.model';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
declare var $:any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses:Course[];
  userLoggedIn:boolean;
  newCourse:any;
  operation:string;
  removeText='';
  filterArgs:string;
  isViewMode: any = false;
  newStudentInfo: any;
  validate:any;
  courseSubmitbtnDisabled:boolean;
  registerSubmitbtnDisabled:boolean;
  validateRegistration:any;
  constructor(private _apiService:ApiService, private _subjectService:SubjectService, private toastr: ToastrService) {
    this.filterArgs = '';
    this.newCourse ={
    name:'',
    topicCovered:'',
    typeOfTution:[
      {
        type:'Home',
        fee:null,
        available:false
      },
      {
        type:'Group',
        fee:null,
        available:false
      }            
    ],
    faculty:[
      {
        name:""
      }
    ],
    class:""
   };
   this.newStudentInfo ={
     name:"",
     emailId:"",
     mobileNo:"",
     address:"",
     subject:"",
     tuitionType:"",
     class:""
   }
   this.courseSubmitbtnDisabled = true;
   this.registerSubmitbtnDisabled = true;
  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
    this.courses  = [];
    this._apiService.getCourse().subscribe((val)=>{
      if(val['data']){
        this.courses = val['data'];
      }
    },response=>{
      console.log(response);
    })

    this.validate= {
      'name':'',
      'topicCovered':'',
      'fee':null
    }
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

  setCourseToBeUpdated(courseId){
    this.newCourse= _.cloneDeep(_.find(this.courses,{courseId:courseId}));
    this.courseSubmitbtnDisabled = true;
  }
  onRegisterClick(name){
    this.newStudentInfo.subject = name;
    this.registerSubmitbtnDisabled = true;
  }

  setFlagAndData(val){
    this.operation = val;
    this.isViewMode = false;
    if(this.operation == 'View Details'){
      this.isViewMode = true;;
    }
    this.newCourse ={
      name:'',
      topicCovered:'',
      typeOfTution:[
        {
          type:'Home',
          fee:null,
          available:false
        },
        {
          type:'Group',
          fee:null,
          available:false
        }            
      ],
      faculty:[
        {
          name:""
        }
      ],
      class:""
     };
     this.newStudentInfo ={
      name:"",
      emailId:"",
      mobileNo:"",
      address:"",
      subject:"",
      tuitionType:"Any",
      class:""
    }
  }

  disableBtn(){
    if(this.operation == 'Add' || this.operation == 'Update'){
      this.courseSubmitbtnDisabled = this.validateCourseData();
    }else if("Enter Student Details"){
      this.registerSubmitbtnDisabled = this.validateRegistrationData();
    }
  }

  onSave(data){
    if(this.operation=='Add'){
      this._apiService.createCourse(this.newCourse).subscribe((val)=>{
        this._apiService.getCourse().subscribe((val)=>{
          if(val['data']){
            this.courses = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Course added successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.operation=='Update'){
      this._apiService.updateCourse(this.newCourse).subscribe((val)=>{
        this._apiService.getCourse().subscribe((val)=>{
          if(val['data']){
            this.courses = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Course updated successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.operation == 'Delete'){
      this._apiService.deleteCourse(this.newCourse.courseId).subscribe((val)=>{
        this._apiService.getCourse().subscribe((val)=>{
          if(val['data']){
            this.courses = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Course deleted successfully', 'Success');
      },response=>{
        console.log(response)
          this.toastr.error('Delete failed', 'Failed');
          this._subjectService.clearToken(response);
      })
      this.removeText='course';
    }
    $('#addCourses').modal('hide');
    $('#confirmModal').modal('hide');
    // }else{
    //   this._apiService.updateAboutUs(this.aboutData).subscribe((val)=>{
    //     this.aboutData = this.aboutData;
    //     this.toastr.success('About us updated successfully', 'Success');
    //   },response=>{
    //       this.aboutData = this.aboutDataCopy;
    //       this.toastr.error('Submit failed', 'Failed');
    //       this._subjectService.clearToken(response);
    //   })
    // }
  }
  onRegister(){
    this._apiService.studentRegister(this.newStudentInfo).subscribe((val)=>{
      this.toastr.success('Registed successfully', 'Success');
    },response=>{
        this.toastr.error('Submit failed', 'Failed');
        this._subjectService.clearToken(response);
    })
    $('#viewDetails').modal('hide');
  }

  validateCourseData(){
    let flag = false;
    if(this.newCourse.name.trim() == this.validate.name){
      $('#courseName').addClass('is-invalid');
      flag = true;
    }else{
      $('#courseName').removeClass('is-invalid');
    }
    if(this.newCourse.topicCovered.trim()== this.validate.topicCovered){
      $('#cdescription').addClass('is-invalid');
      flag = true;
    }else{
      $('#cdescription').removeClass('is-invalid');
    }
    for(var i=0;i<this.newCourse.typeOfTution.length;i++){
      let tutionType = this.newCourse.typeOfTution[i];
      if(tutionType.available && tutionType.fee == this.validate.fee){
        $('#c'+tutionType.type+'fees').addClass('is-invalid');
        flag = true;
      }else{
        $('#c'+tutionType.type+'fees').removeClass('is-invalid');
      }
    }
    return flag;
  }

  validateRegistrationData(){
    let flag = false;
    if(this.newStudentInfo.name.trim() == this.validateRegistration.name){
      $('#rstudentName').addClass('is-invalid');
      flag = true;
    }else{
      $('#rstudentName').removeClass('is-invalid');
    }
    if(this.newStudentInfo.emailId){
      if(!this._apiService.isValidEmail(this.newStudentInfo.emailId)){
        $('#remail').addClass('is-invalid');
        flag = true;
      }else{
        $('#remail').removeClass('is-invalid');
      }
    }
    if(!this._apiService.isValidPhone(String(this.newStudentInfo.mobileNo))){
      $('#rphone').addClass('is-invalid');
      flag = true;
    }else{
      $('#rphone').removeClass('is-invalid');
    }
    if(this.newStudentInfo.address.trim() == this.validateRegistration.address){
      $('#raddress').addClass('is-invalid');
      flag = true;
    }else{
      $('#raddress').removeClass('is-invalid');
    }
    if(this.newStudentInfo.class.trim() == this.validateRegistration.class){
      $('#rclass').addClass('is-invalid');
      flag = true;
    }else{
      $('#rclass').removeClass('is-invalid');
    }
    return flag;
  }

}


