import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ApiService } from '../api.service';
import { Faculty } from './faculty.model';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
declare var $:any;

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  faculties:Faculty[];
  newFaculty:any;
  userLoggedIn:boolean;
  removeText='';
  operation:string;
  filterArgs1:string;
  constructor(private _apiService:ApiService, private _subjectService:SubjectService, private toastr: ToastrService) {
    this.filterArgs1 = '';
    this.newFaculty = {
      name:'',
      degree:{
          name:'',
          college:''
      },
      address:'',
      experience:0,
      mobile:0,
      email:'',
      class:'',
      subjects:''
    }
   }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
     this.faculties  = [];
     this._apiService.getFaculty().subscribe((val)=>{
      if(val['data']){
        this.faculties = val['data'];
      }
    },response=>{
      console.log(response);
     })
  }

  setFacultyToBeUpdated(facultyId){
    this.newFaculty= _.cloneDeep(_.find(this.faculties,{facultyId:facultyId}));
  }

  setFlagAndData(val){
     this.operation = val;
     this.removeText='faculty';
  this.newFaculty = {
    name:'',
    degree:{
        name:'',
        college:''
    },
    address:'',
    experience:0,
    mobile:0,
    email:'',
    class:'',
    subjects:''
  }
   }

   onSave(data){
    if(this.operation=='Add'){
      this._apiService.createFaculty(this.newFaculty).subscribe((val)=>{
        this._apiService.getFaculty().subscribe((val)=>{
          if(val['data']){
            this.faculties = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Faculty added successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.operation=='Update'){
      this._apiService.updateFaculty(this.newFaculty).subscribe((val)=>{
        this._apiService.getFaculty().subscribe((val)=>{
          if(val['data']){
            this.faculties = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Faculty updated successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.operation == 'Delete'){
      this._apiService.deleteFaculty(this.newFaculty.facultyId).subscribe((val)=>{
        this._apiService.getFaculty().subscribe((val)=>{
          if(val['data']){
            this.faculties = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Faculty deleted successfully', 'Success');
      },response=>{
        console.log(response)
          this.toastr.error('Delete failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }
    $('#addFaculties').modal('hide');
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
