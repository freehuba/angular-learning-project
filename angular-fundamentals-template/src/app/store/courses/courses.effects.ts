import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Router } from '@angular/router';
import {
  requestAllCourses,
  requestAllCoursesSuccess,
  requestAllCoursesFail,
  requestFilteredCourses,
  requestFilteredCoursesSuccess,
  requestFilteredCoursesFail,
  requestSingleCourse,
  requestSingleCourseSuccess,
  requestSingleCourseFail,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestEditCourse,
  requestEditCourseSuccess,
  requestEditCourseFail,
  requestCreateCourse,
  requestCreateCourseSuccess,
  requestCreateCourseFail
} from '@app/store/courses/courses.actions';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  // Get all courses effect
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map(courses => requestAllCoursesSuccess({ courses })),
          catchError(error => of(requestAllCoursesFail({ error })))
        )
      )
    )
  );

  // Get filtered courses effect
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      map(([action, allCourses]) => {
        const filteredCourses = allCourses.filter(course =>
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return requestFilteredCoursesSuccess({ courses: filteredCourses });
      }),
      catchError(error => of(requestFilteredCoursesFail({ error })))
    )
  );

  // Get specific course effect
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      exhaustMap(action =>
        this.coursesService.getSpecificCourse(action.id).pipe(
          map(course => requestSingleCourseSuccess({ course })),
          catchError(error => of(requestSingleCourseFail({ error })))
        )
      )
    )
  );

  // Delete course effect
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      exhaustMap(action =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => requestAllCourses()),
          catchError(error => of(requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  // Edit course effect
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      exhaustMap(action =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map(updatedCourse => requestEditCourseSuccess({ course: updatedCourse })),
          catchError(error => of(requestEditCourseFail({ error })))
        )
      )
    )
  );

  // Create course effect
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      exhaustMap(action =>
        this.coursesService.createCourse(action.course).pipe(
          map(createdCourse => requestCreateCourseSuccess({ course: createdCourse })),
          catchError(error => of(requestCreateCourseFail({ error })))
        )
      )
    )
  );

  // Redirect to the courses page after success
  redirectToTheCoursesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourseSuccess, requestEditCourseSuccess, requestSingleCourseFail),
      map(() => this.router.navigate(['/courses']))
    ), { dispatch: false }
  );
}
