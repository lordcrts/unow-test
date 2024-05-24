

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const startStopLoadingSelector = createSelector(getSharedState, (state) => {
  return state.loading;
});

export const getEmployeesSelector = createSelector(getSharedState, (state) => {
  return state.employees;
});

// export const getCarDetailSelector = createSelector(getSharedState, (state) => {
//   return state.carDetail;
// });

// export const getCarsByBrandSelector = createSelector(getSharedState, (state) => {
//   return state.cars;
// });
