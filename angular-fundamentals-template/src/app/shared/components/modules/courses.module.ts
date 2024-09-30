import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';


const routes: Routes = [
  {
    path: '',
    component: CourseCardComponent,  // List of courses
    canActivate: [AuthorizedGuard],  
  },
  {
    path: 'add',
    component: CourseFormComponent,  // Add a new course
    canActivate: [AuthorizedGuard],  
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule] 
})
export class CoursesModule { }
