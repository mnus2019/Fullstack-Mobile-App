import * as ActionTypes from './ActionTypes';

export const suites = (state = { isLoading: true,
                                     errMess: null,
                                     suites: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_SUITES:
            return {...state, isLoading: false, errMess: null, suites: action.payload};

        case ActionTypes.SUITES_LOADING:
            return {...state, isLoading: true, errMess: null, suites: []}

        case ActionTypes.SUITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};