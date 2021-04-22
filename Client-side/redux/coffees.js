import * as ActionTypes from './ActionTypes';

export const coffees = (state = { isLoading: true,
                                     errMess: null,
                                     coffees: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COFFEES:
            return {...state, isLoading: false, errMess: null, coffees: action.payload};

        case ActionTypes.COFFEES_LOADING:
            return {...state, isLoading: true, errMess: null, coffees: []}

        case ActionTypes.COFFEES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};