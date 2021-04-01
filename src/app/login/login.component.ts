import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { SubjectService } from '../subject.service';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCredential:any;
  constructor(private toastr: ToastrService,private _subjectService:SubjectService,private _apiService:ApiService) { 
    this.userCredential={
      username:'',
      password:''
    }
    
  }

  ngOnInit(): void {
    
  }

  signIn(){
    this._apiService.login(this.userCredential).subscribe((val)=>{
      console.log(val['data']);
      localStorage.setItem('token',val['data'].toString());
      this.toastr.success('Welcome '+this.userCredential.username, 'Success');
      $('#loginModal').modal('hide');
      this._subjectService.updateSource(true);
    },
    response => {
      this.toastr.error('Username or passsword is invalid', 'Sign in error');
    })
  }

}
