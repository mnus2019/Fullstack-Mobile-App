import React, { Component } from 'react'
import { View,Text, StyleSheet,Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import MyCart from "./MyCartComponent"

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
  };


  function CartQty(props) {
    let qty = 0;
    for (let key in props.cart) {
      qty = qty + props.cart[key].qty;
    }
    return qty;
  }

class ShoppingCartIcon extends Component {

  

    render(){
      
    return (
        <View style={{padding:5}}>
            <View style={{
                position:'absolute',height:30,width:50,
                borderRadius:15,backgroundColor:"rgba(95,197,123,0.8)",
                right:15,bottom:15,alignItems:'center',
                justifyContent:"center",zIndex:2000
            }}>
           <Text 
           onPress={()=>{
            Alert.alert(
     
                "Your Cart Items",
                   
                
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {console.log("Cancel Pressed")
                    this.resetForm();},
                  },
                  {
                 
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                  },
                ],
                { cancelable: false }
              );
            }}
        
           style={{color:"white",fontWeight:"bold"}}>
               Qty: <CartQty cart={this.props.cartItems.cartItems} />
               </Text>
            </View>
       
            <Icon size={30}
               name='cart-arrow-down'
               type='font-awesome'
                //  onPress={()=>{
                //      Alert.alert("Your Cart Items")
                //  }}  
            />
       
        </View>
    )
}
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default connect(mapStateToProps)(ShoppingCartIcon);