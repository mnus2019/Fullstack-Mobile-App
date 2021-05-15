

import * as ActionTypes from './ActionTypes';

export const cartItems = (state = { isLoading: true,
                                     errMess: null,
                                     cartItems: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            var existing = state.cartItems.filter((p) =>( p.product._id === action.payload._id));
            if (existing.length) {
              const withoutExisting = state.cartItems.filter(
                (p) => (p.product._id !== action.payload._id)
              );
              const updatedproduct = { ...existing[0], qty: existing[0].qty + 1 };
        

            return {...state, cartItems: [...withoutExisting, updatedproduct]}
            
            } else {  
           
            return {...state, cartItems: [...state.cartItems, { product: action.payload, qty: 1 }]}

            }
            case ActionTypes.ADD_TO_API_CART:
              var existingApi = state.cartItems.filter((p) =>( p.product.id === action.payload.id));
              if (existingApi.length) {
                const withoutApiExisting = state.cartItems.filter(
                  (p) => (p.product.id !== action.payload.id)
                );
                const updatedApiproduct = { ...existingApi[0], qty: existingApi[0].qty + 1 };
          
  
              return {...state, cartItems: [...withoutApiExisting, updatedApiproduct]}
              
              } else {  
             
              return {...state, cartItems: [...state.cartItems, { product: action.payload, qty: 1 }]}
  
              }
        case ActionTypes.REMOVE_FROM_CART:
            return {...state,cartItems: state.cartItems.filter((item ) => 
  
            item.product._id === action.payload._id && item.qty > 1 ? item.qty-- :item.product._id !== action.payload._id
             
            )}

            case ActionTypes.REMOVE_FROM_API_CART:
              return {...state,cartItems: state.cartItems.filter((item ) => 
    
             item.product.id === action.payload.id && item.qty > 1 ? item.qty-- :item.product.id !== action.payload.id
          
              )}

        case ActionTypes.CART_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};








