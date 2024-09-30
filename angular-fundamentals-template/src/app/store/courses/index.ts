import { ActionReducerMap } from '@ngrx/store';
import { coursesReducer, CoursesState } from './courses.reducer';
import { CoursesEffects } from './courses.effects';

// Define the State interface with the CoursesState
export interface State {
  courses: CoursesState;
}

// Combine reducers in an ActionReducerMap
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer
};

// Define the array of effects to be used
export const effects = [CoursesEffects];
