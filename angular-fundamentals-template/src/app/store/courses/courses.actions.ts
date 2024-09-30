import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from '@app/services/course.model';

// Actions for request all courses
export const requestAllCourses = createAction(
  CoursesConstants.REQUEST_ALL_COURSES
);

// Actions for request all courses success
export const requestAllCoursesSuccess = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
  props<{ courses: Course[] }>() 
);

// Actions for request all courses fail
export const requestAllCoursesFail = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_FAIL,
  props<{ error: string }>() 
);

// Actions for request individual course
export const requestSingleCourse = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE,
  props<{ id: string }>() 
);

// Actions for request individual course success
export const requestSingleCourseSuccess = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
  props<{ course: Course }>() 
);

// Actions for request individual course fail
export const requestSingleCourseFail = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
  props<{ error: string }>() 
);

// Actions for request filtered courses
export const requestFilteredCourses = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES,
  props<{ title: string }>() 
);

// Actions for request filtered courses success
export const requestFilteredCoursesSuccess = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
  props<{ courses: Course[] }>() 
);


// Actions for request filtered courses fail
export const requestFilteredCoursesFail = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
  props<{ error: string }>()
);

// Actions for delete course
export const requestDeleteCourse = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE,
  props<{ id: string }>() 
);

// Actions for delete course success
export const requestDeleteCourseSuccess = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS
);

// Actions for delete course fail
export const requestDeleteCourseFail = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
  props<{ error: string }>() 
);

// Actions for edit course
export const requestEditCourse = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE,
  props<{ id: string, course: Course }>() 
);

// Actions for edit course success
export const requestEditCourseSuccess = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
  props<{ course: Course }>() 
);

// Actions for edit course fail
export const requestEditCourseFail = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
  props<{ error: string }>()
);

// Actions for create course
export const requestCreateCourse = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE,
  props<{ course: Course }>() 
);

// Actions for create course success
export const requestCreateCourseSuccess = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
  props<{ course: Course }>()
);

// Actions for create course fail
export const requestCreateCourseFail = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
  props<{ error: string }>() 
);
