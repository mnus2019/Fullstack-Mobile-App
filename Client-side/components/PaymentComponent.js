import React, {useState} from 'react';
import axios from 'axios';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import ShoppingCartIcon from './ShoppingCartIconComponent';
import {View,Button,ScrollView,Alert} from "react-native";
import { Input,Card } from "react-native-elements"; 
import {
  CardField,
  CardFieldInput,
  useElements,
  useStripe,
} from '@stripe/stripe-react-native';
import { connect } from "react-redux";






const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};




PayCheckout.navigationOptions = {
    title: "Payment",
    headerRight:(
      <ShoppingCartIcon/>
    ),
   
    };


function PayCheckout(props) {
  
  const [email, setEmail] = useState('');
 
  const [amount, setAmount] = useState('');
 
  const [card, setCard] = useState("");
  const { confirmPayment, handleCardAction } = useStripe();

 
  const stripe = useStripe();
 


//   const CartTotal=()=>{
//     let sum = 0;
//     for(let key in props.cartItems.cartItems){
//           sum = sum + (props.cart[key].product.price * props.cart[key].qty);
//     }
//     setAmount(sum);
//     return sum;
//   }

//   }
 

  const handleSubmit = async () => {
    if (!stripe || !card ) {
     
      return;
    }
        
   

    const res = await axios.post('http://192.168.254.16:3000/pay', {email: email,
    amount:amount     
     });

    const clientSecret = res.data['client_secret'];

    const result = await stripe.handleCardAction(clientSecret, {      
     
     payment_method: {
      card: card.values,
        
        billing_details: {
         
          email: email        
         
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log("error on payment");
      console.log(result.error.message);
      Alert.alert("ERROR", `ERROR ON PAYMEN.\n${card.values.number}\n${card.status.number}\nTHANK YOUT!!!`);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Your Payment was successfull!');
        console.log(result);
        Alert.alert("SUCCESS", `YOUR PAYMENT WAS SUCCESSFULL.\n${card.values.number}\n${card.status.number}\nTHANK YOU !!!`);
       
      
      }
    }
  };

  return (
   <ScrollView>
   <Card>

   <CreditCardInput onChange={this._onChange= form => setCard(form)} />
     
   <Input
            style={{ height: 40, borderColor: "blue", borderWidth: 1 }}
            placeholder="Email"
           
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setEmail( text )}
            value={email}
            maxLength={16}
          />
          <Input
            style={{ height: 40, borderColor: "blue", borderWidth: 1 }}
            placeholder="Amount"
          
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setAmount( text )}
            value={amount}
            maxLength={16}
          />

        

         
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                handleSubmit();
               
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
             <Button
                  onPress={() => props.navigation.navigate("MyCart")
                }
              color="#808080"
              title="Cancel"
           
            /> 
          </View>
      
   </Card>
  
   </ScrollView>
    
  );
}

export default  connect(mapStateToProps,null)(PayCheckout);

















