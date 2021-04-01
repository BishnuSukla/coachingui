import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  source = new BehaviorSubject<boolean>(false);
  constructor() { 
    if(localStorage.getItem('token')){
      this.updateSource(true);
    }else{
      this.updateSource(false);
    }
  }

  updateSource(newValue) {
    this.source.next(newValue)
  }

  clearToken(response){
    let arr = [0,401,401,403,404];
    if(arr.includes(response.status)){
      localStorage.removeItem('token')
      this.source.next(false);
    }
  }
}
