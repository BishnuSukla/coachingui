import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
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
  filterArgs1:string;
  operation:string;
  selectedStudent:any;
  removeText:string;
  constructor(private _apiService:ApiService, private _subjectService:SubjectService,private toastr: ToastrService) {
    this.filterArgs1 = '';
    this.selectedStudent = {
      name:'',
      address:'',
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
    this.registeredStudentList  = [];
    this._apiService.getStudentRegister().subscribe((val)=>{
      if(val['data']){
        this.registeredStudentList = val['data'];
      }
    },response=>{
      console.log(response);
    })
  }
  setStudentToBeUpdated(studentId){
    this.selectedStudent = _.cloneDeep(_.find(this.registeredStudentList,{registrationId:studentId}));
  }

  setFlagAndData(val){
     this.operation = val;
     this.removeText ="student";
   }
  onSave(data){
     if(this.operation=='Update'){
      this._apiService.updateStudent(this.selectedStudent).subscribe((val)=>{
        this._apiService.getStudentRegister().subscribe((val)=>{
          if(val['data']){
            this.registeredStudentList = val['data'];
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
      // this._apiService.deleteStudent(this.selectedStudent.registrationId).subscribe((val)=>{
      //   this._apiService.getStudentRegister().subscribe((val)=>{
      //     if(val['data']){
      //       this.registeredStudentList = val['data'];
      //     }
      //   },response=>{
      //     console.log(response);
      //   })
      //   this.toastr.success('Student deleted successfully', 'Success');
      // },response=>{
      //   console.log(response)
      //     this.toastr.error('Delete failed', 'Failed');
      //     this._subjectService.clearToken(response);
      // })
    }
    //$('#editStudent').modal('hide');
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
