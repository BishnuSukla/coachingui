import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
import { About } from './about.model';
declare var $:any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutData:About;
  aboutDataCopy:About;
  userLoggedIn:boolean;
  constructor(private _apiService:ApiService,private _subjectService:SubjectService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
    this.aboutData  = {
      title:'',
      description:'',
      contact:{
        phone:0,
        email:''
      }
    }
    this.aboutDataCopy = Object.assign({}, this.aboutData);
    this._apiService.getAboutUs().subscribe((val)=>{
      if(val['data'][0]){
        this.aboutData = val['data'][0];
        this.aboutDataCopy = Object.assign({}, this.aboutData);
      }
    },response=>{
      console.log(response);
    })
  }

  onSubmit(){
    if(this.aboutDataCopy.title==''){
      this._apiService.createAboutUs(this.aboutData).subscribe((val)=>{
        this.aboutData = this.aboutData;
        this.toastr.success('About us added successfully', 'Success');
      },response=>{
          this.aboutData = this.aboutDataCopy;
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else{
      this._apiService.updateAboutUs(this.aboutData).subscribe((val)=>{
        this.aboutData = this.aboutData;
        this.toastr.success('About us updated successfully', 'Success');
      },response=>{
          this.aboutData = this.aboutDataCopy;
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }
  }


}
