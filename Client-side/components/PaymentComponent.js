


import React, {useState} from 'react';
import axios from 'axios';
// MUI Components
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import TextField from '@material-ui/core/TextField';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { Card } from "react-native-elements";
import {
    Text,
    View,
      Modal,
      ModalHeader,
      ModalBody,
    Button,
    StyleSheet,
    ScrollView
   
  } from "react-native";

// import { 
  
//   Modal,
//   ModalHeader,
//   ModalBody,
  
// } from "reactstrap";
// stripe
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';
import { connect } from "react-redux";
// Util imports
// import {makeStyles} from '@material-ui/core/styles';
// // Custom Components
// import CardInput from './CardInput';

const styles = StyleSheet.create({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
    backgroundColor:'#A9A9a9'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});




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
  const classes = useStyles();
  // State
  const [email, setEmail] = useState('');
 
  const [amount, setAmount] = useState('');
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[isModalfailed,setIsModalfailed]  = useState(false);
  const [card, setCard] = useState<CardFieldInput.Details | null>(null);
  const stripe = useStripe();
  const elements = CardFieldInput;


  const CartTotal=(props)=>{
    let sum = 0;
    for(let key in props.cartItems.cartItems){
          sum = sum + (props.cart[key].product.price * props.cart[key].qty);
    }
    setAmount(sum);
    return sum;
  }
 const toggleModal=()=> {
    setIsModalOpen(!isModalOpen);
  }

  const toggleModalFailed=()=> {
    setIsModalfailed(!isModalfailed);
  }
 

  const handleSubmit = async (props) => {
    if (!stripe || !elements) {
     
      return;
    }
        
    CartTotal(props);

    const res = await axios.post('http://192.168.254.16:3000/pay', {email: email,
      amount:amount,  
     
     });

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
         
          email: email        
          
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      toggleModalFailed();
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Your Payment was successfull!');
        console.log(result);
        toggleModal();
      
      }
    }
  };

  return (
   <ScrollView>
     <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        setCard(cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
         
            <ModalHeader className="bg-info" toggle={toggleModal}>PAYMENT</ModalHeader>

            <ModalBody>
              <h1>  THANK YOU ! YOU HAVE SUCCESSFULLY PAID.</h1>
         
          <p> Order placed! You will receive an email confirmation.</p>
            </ModalBody>
          
        </Modal>
        <Modal isOpen={isModalfailed} toggle={toggleModalFailed}>
         
         <ModalHeader className="bg-info" toggle={toggleModalFailed}>PAYMENT</ModalHeader>

         <ModalBody>
       
           <h1> SORRY ! YOUR CARD HAS INSUFFICIENT FUNDS.</h1>
           <p>
              Order canceled -- continue to shop around and checkout when you're ready.
         
           </p>
         </ModalBody>
       
     </Modal>
  
   </ScrollView>
    
  );
}

export default  connect(mapStateToProps,null)(PayCheckout);

















