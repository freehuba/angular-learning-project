import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoursesState } from '@app/store/courses/courses.reducer';
import * as CoursesActions from '@app/store/courses/courses.actions';
import * as CoursesSelectors from '@app/store/courses/courses.selectors';
import { Course } from '@app/services/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {
    
  // Define public observable properties
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));
  allCourses$: Observable<any[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
  errorMessage$: Observable<string | null> = this.store.pipe(select(CoursesSelectors.getErrorMessage));


  constructor(private store: Store<CoursesState>) {}

  // Dispatch methods
  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id: id.toString() }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: any, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id: id.toString(), course: body }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id: id.toString() }));
  }
}
