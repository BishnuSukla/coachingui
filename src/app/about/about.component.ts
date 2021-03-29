import { Component, OnInit } from '@angular/core';
import { About } from './about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutData:About;

  constructor() { 
    this.aboutData = {
      title:'Hello, Champs!',
      description:'This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.',
      contact:{
        phone:9206329453,
        email:"bishnusukla@getMaxListeners.com"
      }
    }
    console.log(this.aboutData);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.aboutData);
  }

}
