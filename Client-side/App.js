import React,{useEffect} from "react";
// import {loadStripe} from '@stripe/stripe-js';



import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { initStripe } from '@stripe/stripe-react-native';


import Loading from "./components/LoadingComponent";
import Main from "./components/MainComponent";




// import { PublishiableKey } from './config';
import { View } from "react-native";





// const fetchPublishableKey = async () => {
//   const key = await fetchKey(); // fetch key from your server here
//   setPublishableKey(key);
// };





const publishableKey = "sk_test_51HZKUOLQorsKb9OTgjw6br1t9l2dE3aqWWPe5XDdwvGK4Oj19zlBJjzInsGPGxOzOjlI9X9DjozIf9S5PimthoBF00ZKwVIc28"
   ;

const { persistor, store } = ConfigureStore();

export default function App() {


  useEffect(() => {
    initStripe({
      publishableKey:publishableKey
    
    });
  }, []);
 
  return (
    <Provider   store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
      
      
        <Main />
     
      </PersistGate>
    </Provider>
  );
}
