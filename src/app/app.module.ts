import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NotificationComponent } from './notification/notification.component';
import { CourseComponent } from './course/course.component';
import { FacultyComponent } from './faculty/faculty.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmComponent } from './confirm/confirm.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculty', component: FacultyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    NotificationComponent,
    CourseComponent,
    FacultyComponent,
    HomeComponent,
    LoginComponent,
    ConfirmComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
