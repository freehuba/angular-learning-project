import { CoursesService } from '@app/services/courses.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Course } from '@app/services/course.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input() courses: Course[] = [];
  allCourseArray: any[] = []; 


  constructor(private firebaseService: CoursesService,private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.getAllCourses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courses']) {
      this.updateCourseArrayWithFilteredCourses(changes['courses'].currentValue);
    }
  }

  getAllCourses() {
    this.firebaseService.getAll().pipe(
      map((response: any) => {
        const coursesArray: Course[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            coursesArray.push({ id: key, ...response[key] }); 
          }
        }
        return coursesArray;
      })
    ).subscribe(
      (data: Course[]) => {
        console.log('Fetched courses:', data);
        this.allCourseArray = data; // Assign fetched data to courseArray
        this.updateCourseArrayWithFilteredCourses(this.courses); // Merge filtered courses
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  updateCourseArrayWithFilteredCourses(filteredCourses: Course[]) {
    if (filteredCourses && filteredCourses.length > 0) {
      this.allCourseArray = filteredCourses; 
    } else {
      this.allCourseArray = [...this.allCourseArray]; 
    }
  }

  onShowCourseClick(course : Course): void {
    console.log('Show Course button clicked', course);
    // Add your logic here
  }

  onTrashClick(courseId : string): void {
    console.log('Trash button clicked',courseId);
    this.firebaseService.deleteCourse(courseId).subscribe(() => {
      alert('The course has been deleted successfully!'); 
      this.getAllCourses(); 
    });
  }

  onEditClick(course : Course): void {
    console.log('Edit button clicked', course);
    this.router.navigate(['/courses/add']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
