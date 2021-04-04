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
  constructor(private _apiService:ApiService, private _subjectService:SubjectService, private toastr: ToastrService) {
    this.filterArgs = '';
    this.newCourse ={
    name:'',
    topicCovered:'',
    typeOfTution:[
      {
        type:'Home',
        fee:0,
        available:false
      },
      {
        type:'Group',
        fee:0,
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
  }

  setCourseToBeUpdated(courseId){
    this.newCourse= _.cloneDeep(_.find(this.courses,{courseId:courseId}));
  }

  setFlagAndData(val){
    this.operation = val;
    this.removeText='course';
    this.newCourse ={
      name:'',
      topicCovered:'',
      typeOfTution:[
        {
          type:'Home',
          fee:0,
          available:false
        },
        {
          type:'Group',
          fee:0,
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
    }
    $('#addCourses').modal('hide');
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

}


