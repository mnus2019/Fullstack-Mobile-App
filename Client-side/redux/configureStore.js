import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from "redux-thunk";
//import logger from "redux-logger";
import { campsites } from './campsites';
import { coffees } from "./coffees";
import { suites} from "./suites";
import { locations} from "./locations";
import { clothes} from "./clothes";
import { comments } from './comments';
import { cartItems } from './cartItems';
import { favorites } from './favorites';
import { partners } from './about';

const config = {
  key: 'root',
  storage,
  debug: true
}

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config,{
      campsites:campsites,
      comments:comments, 
      suites: suites,
      coffees: coffees,
      locations: locations,
      clothes:clothes,
      cartItems:cartItems,
      favorites: favorites,
      partners:partners
          
    }),
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
