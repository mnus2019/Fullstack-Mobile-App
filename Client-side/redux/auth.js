import * as ActionTypes from './ActionTypes';
import * as SecureStore from 'expo-secure-store';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const auth = (state = {
        isLoading: false,
        regUser: false,
        isAuthenticated: SecureStore.getItemAsync('token') ? true : false,
        token: SecureStore.getItemAsync('token'),
        user: SecureStore.getItemAsync('creds') ? SecureStore.getItemAsync('creds') : null,
        errMess: null
    }, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                token: action.token,
                
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
            case ActionTypes.LOGOUT_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: true
                };
            case ActionTypes.LOGOUT_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    token: '',
                    user: null,
                    regUser: false
                };        
            case ActionTypes.REGISTER_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,

                };
            case ActionTypes.REGISTER_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMess: action.message
                };
            
            case ActionTypes.REGISTER_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    token: '',                   
                    regUser: true
                };
            
        default:
            return state
    }
}