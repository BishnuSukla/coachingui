import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
import { Notification } from './notification.model';
import * as _ from 'lodash'
declare var $:any;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  userLoggedIn:boolean;
  notifications:Notification[];
  newNotification:any;
  flag:string;
  removeText='';
  constructor(private _apiService:ApiService,private _subjectService:SubjectService,private toastr: ToastrService) { 
    this.newNotification = {
      notification:''
    }
  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
    this.notifications  = [];
    this._apiService.getNotifications().subscribe((val)=>{
      if(val['data']){
        this.notifications = val['data'];
      }
    },response=>{
      console.log(response);
    })
  }

 

  setFlagAndData(val){
    this.flag = val;
    if(this.flag == 'Delete'){
      this.removeText='notification';
    }else{
      this.removeText = '';
    }
    this.newNotification = {
      notification:''
    }
  }
  setNotificationToBeUpdated(notificationId){
    this.newNotification = _.cloneDeep(_.find(this.notifications,{notificationId:notificationId}));
  }

  addNotification(data){
    if(this.flag=='Add'){
      this._apiService.createNotification(this.newNotification).subscribe((val)=>{
        this._apiService.getNotifications().subscribe((val)=>{
          if(val['data']){
            this.notifications = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Notification added successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.flag=='Update'){
      this._apiService.updateNotification(this.newNotification).subscribe((val)=>{
        this._apiService.getNotifications().subscribe((val)=>{
          if(val['data']){
            this.notifications = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Notification updated successfully', 'Success');
      },response=>{
          this.toastr.error('Submit failed', 'Failed');
          this._subjectService.clearToken(response);
      })
    }else if(this.flag == 'Delete'){
      this._apiService.deleteNotification(this.newNotification.notificationId).subscribe((val)=>{
        this._apiService.getNotifications().subscribe((val)=>{
          if(val['data']){
            this.notifications = val['data'];
          }
        },response=>{
          console.log(response);
        })
        this.toastr.success('Notification deleted successfully', 'Success');
      },response=>{
        console.log(response)
          this.toastr.error('Delete failed', 'Failed');
          this._subjectService.clearToken(response);
      })
      this.removeText = '';
    }
    $('#newNotification').modal('hide');
  }


}
