import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { Course } from '@app/services/course.model';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];              // All courses list
  course: Course | null;             // Individual course
  isAllCoursesLoading: boolean;      // Loading state for all courses
  isSingleCourseLoading: boolean;    // Loading state for a single course
  isSearchState: boolean;            // Indicator for whether a search is happening
  errorMessage: string | null;       // Error message if any action fails
}

// Initial state
export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null
};

export const coursesReducer = createReducer(
  initialState,

  // Request all courses
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),

  // Request single course
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error
  })),

  // Request filtered courses
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
    errorMessage: null
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: false
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isSearchState: false,
    errorMessage: error
  })),

  // Delete course
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state 
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),

  // Edit course
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  })),

  // Create course
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: null
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course]
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error
  }))
);


export const reducer = (state: CoursesState = initialState, action: Action): CoursesState =>
  coursesReducer(state, action);
