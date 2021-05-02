import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
import { About } from './about.model';
import * as _ from 'lodash';
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
  validate:any;
  btnDisabled:boolean;

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
    this.validate = {
      title:'',
      description:'',
      phone:10,
      email:''
    }
    this.btnDisabled = true;
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

  setAboutToBeUpdated(){
    this.aboutData = _.cloneDeep(this.aboutDataCopy);
    this.btnDisabled = true;
  }

  onSubmit(){
    if(this.aboutDataCopy.title==''){
      this._apiService.createAboutUs(this.aboutData).subscribe((val)=>{
        this.aboutData = this.aboutData;
        this.aboutDataCopy = this.aboutData;
        this.toastr.success('About us added successfully', 'Success');
      },response=>{
          this.aboutData = this.aboutDataCopy;
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else{
      this._apiService.updateAboutUs(this.aboutData).subscribe((val)=>{
        this.aboutData = this.aboutData;
        this.aboutDataCopy = this.aboutData;
        this.toastr.success('About us updated successfully', 'Success');
      },response=>{
          this.aboutData = this.aboutDataCopy;
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }
    $('#editAboutUs').modal('hide');
  }
  disableBtn(){
    this.btnDisabled = this.validateAboutData();
  }
  validateAboutData(){
    let flag = false;
    if(this.aboutData.title.trim() == this.validate.title){
      $('#atitle').addClass('is-invalid');
      flag = true;
    }else{
      $('#atitle').removeClass('is-invalid');
    }
    if(this.aboutData.description.trim() == this.validate.description){
      $('#adescription').addClass('is-invalid');
      flag = true;
    }else{
      $('#adescription').removeClass('is-invalid');
    }
    if(this.aboutData.contact && this.aboutData.contact.phone && !this._apiService.isValidPhone(String(this.aboutData.contact.phone))){
      $('#amobile').addClass('is-invalid');
      flag = true;
    }else{
      $('#amobile').removeClass('is-invalid');
    }
    if(this.aboutData.contact && this.aboutData.contact.email && !this._apiService.isValidEmail(this.aboutData.contact.email)){
      $('#aemail').addClass('is-invalid');
      flag = true;
    }else{
      $('#aemail').removeClass('is-invalid');
    }
    return flag;
  }


}
