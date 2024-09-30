import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<any[]>([]);
  private authors$$ = new BehaviorSubject<any[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe(
      (courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  createCourse(course: any): void {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe(
      (newCourse) => {
        const currentCourses = this.courses$$.getValue();
        this.courses$$.next([...currentCourses, newCourse]);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  getCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService
      .getCourse(id)
      .pipe(tap(() => this.isLoading$$.next(false)));
  }

  editCourse(id: string, course: any): void {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe(
      () => {
        const currentCourses = this.courses$$.getValue();
        const updatedCourses = currentCourses.map((c) =>
          c.id === id ? { ...c, ...course } : c
        );
        this.courses$$.next(updatedCourses);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).subscribe(
      () => {
        const currentCourses = this.courses$$.getValue();
        const updatedCourses = currentCourses.filter((c) => c.id !== id);
        this.courses$$.next(updatedCourses);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  filterCourses(value: string): void {
    const filteredCourses = this.courses$$
      .getValue()
      .filter((course) => course.title.includes(value));
    this.courses$$.next(filteredCourses);
  }

  getAllAuthors(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAllAuthors().subscribe(
      (authors) => {
        this.authors$$.next(authors);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  createAuthor(name: string): void {
    this.isLoading$$.next(true);
    this.coursesService.createAuthor(name).subscribe(
      (newAuthor) => {
        const currentAuthors = this.authors$$.getValue();
        this.authors$$.next([...currentAuthors, newAuthor]);
        this.isLoading$$.next(false);
      },
      () => {
        this.isLoading$$.next(false);
      }
    );
  }

  getAuthorById(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService
      .getAuthorById(id)
      .pipe(tap(() => this.isLoading$$.next(false)));
  }
}
