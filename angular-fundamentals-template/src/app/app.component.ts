import { Component } from '@angular/core';
import { CoursesService } from './services/courses.service';

interface Course {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  infoText: string = '';
  courses: Course[] = []; 
  filteredCourses: Course[] = [];
  userName: string | null = null;


  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.getCourses(); 
  }

  handleLogin(name: string): void {
    this.userName = name;
  }

  getCourses() {
    this.coursesService.getAll().subscribe((response) => {
      if (response) {
        this.courses = Object.keys(response).map(key => ({
          id: key, 
          ...response[key]
        }));
        this.filteredCourses = this.courses; 
      } else {
        console.log('No courses found');
      }
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }

  handleSearch(searchValue: string) {
    this.infoText = searchValue;
    this.filterCourses(searchValue);
  }

  filterCourses(title: string) {
    this.filteredCourses = this.courses.filter(course => 
      course.title.toLowerCase().includes(title.toLowerCase())
    );
  }
}
