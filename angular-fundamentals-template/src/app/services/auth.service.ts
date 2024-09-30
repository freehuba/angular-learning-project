import { CoursesService } from '@app/services/courses.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;

  userData: User[] = [];

  constructor(private coursesService: CoursesService) {}

  authenticate(email: string, password: string): Observable<string | null> {
    return this.coursesService.getUserByEmail(email).pipe(
      map((data: { [id: string]: User }) => {
        
        this.userData = Object.entries(data).map(([id, user]) => ({
          id, 
          ...user 
        }));
  
        console.log(this.userData);
  
        // Check if the user exists and credentials match
        const user = this.userData.find((u) => u.email === email && u.password === password);
        return user ? user.username : null;
      })
    );
  }  
}
