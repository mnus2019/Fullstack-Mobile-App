

import * as ActionTypes from './ActionTypes';

export const cartItems = (state = { isLoading: true,
                                     errMess: null,
                                     cartItems: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            var existing = state.cartItems.filter((p) => p.product.id === action.payload.id);
            if (existing.length) {
              const withoutExisting = state.cartItems.filter(
                (p) => p.product.id !== action.payload.id
              );
              const updatedproduct = { ...existing[0], qty: existing[0].qty + 1 };
        

            return {...state, cartItems: [...withoutExisting, updatedproduct]}
            
            } else {
           
            return {...state, cartItems: [...state.cartItems, { product: action.payload, qty: 1 }]}

            }
        case ActionTypes.REMOVE_FROM_CART:
            return {...state,cartItems: state.cartItems.filter((item,i) =>
              item === action.payload && action.payload.qty > 1 ? item.qty - 1 :   item !== action.payload
             
            )}

        case ActionTypes.CART_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};








