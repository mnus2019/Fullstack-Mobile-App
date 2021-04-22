import * as ActionTypes from './ActionTypes';

export const clothes = (state = { isLoading: true,
                                     errMess: null,
                                     clothes: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CLOTHES:
            return {...state, isLoading: false, errMess: null, clothes: action.payload};

        case ActionTypes.CLOTHES_LOADING:
            return {...state, isLoading: true, errMess: null, clothes: []}

        case ActionTypes.CLOTHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};