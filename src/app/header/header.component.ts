import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoggedIn:boolean;
  constructor(private _subjectService:SubjectService,private _apiService:ApiService) {
    
  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
  }

  logout(){
    this._apiService.logout();
  }

}
