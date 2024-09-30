import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private firebaseUrl = "https://angular-ce5c7-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {}

  // Function to add course data to Firebase
  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/courses.json`, course);
  }


  // Function to get all courses from Firebase
  getAll(): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/courses.json`);
  }

  // Function to delete  a course by id from Firebase
  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.firebaseUrl}/courses/${id}.json`);
  }


  // Function to create a new course
  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/courses.json`, course);
  }

  // Function to edit a course by id
  editCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.firebaseUrl}/courses/${id}.json`, course);
  }

  // Function to get a specific course by id
  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/courses/${id}.json`);
  }

  // Function to filter courses (this is a simple example)
  filterCourses(value: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/courses.json`, {
      params: { search: value },
    });
  }

  // Function to get all authors
  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/authors.json`);
  }

  // Function to create a new author
  createAuthor(name: string): Observable<any> {
    const author = { name };
    return this.http.post(`${this.firebaseUrl}/authors.json`, author);
  }

   // Function to get an author by id
   getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/authors/${id}.json`);
  }


  // user registration and login functions

    // Function to add User data to Firebase
    addUser(user: any): Observable<any> {
      return this.http.post(`${this.firebaseUrl}/users.json`, user);
    }
  
    // Function to get all users from Firebase
    getAllUsers(): Observable<any> {
      return this.http.get(`${this.firebaseUrl}/users.json`);
    }
  
    // Function to get a specific user by email
    getUserByEmail(email: string): Observable<any> {
      return this.http.get(`${this.firebaseUrl}/users.json`, {
        params: { email },
      });
    }
}
