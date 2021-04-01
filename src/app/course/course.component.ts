import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Course } from './course.model';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses:Course[];
  userLoggedIn:boolean;
  constructor(private _subjectService:SubjectService) {
    this.courses = [
      {
        name:'Maths',
        topicCovered:"On this course will cover probabilty, permutation and combination etc etc etc etc etec On this course will cover probabilty, permutation and combination etc etc etc etc etec On this course will cover probabilty, permutation and combination ",
        typeOfTution:[
          {
            type:'Home',
            fee:"500rs",
            available:true
          },
          {
            type:'Group',
            fee:"200rs",
            available:true
          }
        ],
        faculty:[
          {
            name:"Plabita Das"
          }
        ],
        class:['V',"IX"]
    },
    {
      name:'Science',
      topicCovered:"On this course will cover probabilty, permutation and combination etc etc etc etc etec ",
      typeOfTution:[
        {
          type:'Home',
          fee:"500rs",
          available:false
        },
        {
          type:'Group',
          fee:"200rs",
          available:true
        }
      ],
      faculty:[
        {
          name:"Plabita Das"
        }
      ],
      class:['V',"IX"]
  },
  {
    name:'History',
    topicCovered:"On this course will cover probabilty, permutation and combination etc etc etc etc etec ",
    typeOfTution:[
      {
        type:'Home',
        fee:"500rs",
        available:true
      },
      {
        type:'Group',
        fee:"200rs",
        available:false
      }
    ],
    faculty:[
      {
        name:"Plabita Das"
      }
    ],
    class:['V',"IX"]
    },
    {
      name:'Sociology',
      topicCovered:"On this course will cover probabilty, permutation and combination etc etc etc etc etec ",
      typeOfTution:[
        {
          type:'Home',
          fee:"500rs",
          available:true
        },
        {
          type:'Group',
          fee:"200rs",
          available:false
        }
      ],
      faculty:[
        {
          name:"Plabita Das"
        }
      ],
      class:['V',"IX"]
      },
  ]
  }

  ngOnInit(): void {
    this._subjectService.source.subscribe((val)=>{
      this.userLoggedIn = val;
    })
  }

}
