import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import { coursesFeatureKey } from "./courses.reducer";

// Feature selector to select the courses feature state
export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

// Selector for `isAllCoursesLoading`
export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isAllCoursesLoading
);

// Selector for `isSearchingState`
export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSearchState
);

// Selector for `isSingleCourseLoading`
export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSingleCourseLoading
);

// Selector for all courses
export const getAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

// Selector for an individual course
export const getCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.course
);

// Selector for error message
export const getErrorMessage = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.errorMessage
);
