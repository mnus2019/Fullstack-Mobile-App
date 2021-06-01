import React, { Component } from "react";
import { FlatList,View, Text,Button, StyleSheet, Alert, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Swipeout from "react-native-swipeout";
import { baseUrl } from "../shared/baseUrl";
import { deleteItemFromCart,addItemToCart } from "../redux/ActionCreators";

import { connect } from "react-redux";


const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};
const mapDispatchToProps = {
  addItemToCart: (item) => addItemToCart(item),
  deleteItemFromCart: (item) => deleteItemFromCart(item),
};

class MyCart extends Component {
  static navigationOptions = {
    title: "Cart Items",
  };

  deleteCart = (item) => {
    this.props.deleteItemFromCart(item);
  };

  addCart = (item) => {
    this.props.addItemToCart(item);
  };


  render() {
    const { navigate } = this.props.navigation;
    const renderFavoriteItem = ({ item }) => {
      const rightButton = [
        {
          text: "delete",
          type: "delete",
          onPress: () => {
            Alert.alert(
              "Delete Your Cart Item",
              "Are you sure you wish to delete the cart item " +
                item.product.name +
                "?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log(item.name +""+ "Not Deleted"),
                  style: " cancel",
                },
                {
                  text: "OK",
                  onPress: () => this.deleteCart(item),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ];


      const leftButton = [
        {
          text: "Add",
          type: "Add",
          onPress: () => {
            Alert.alert(
              "Delete Your Cart Item",
              "Are you sure you wish to Add the cart item " +
                item.product.name +
                "?",
              [ 
                 {
                text: "Cancel",
                onPress: () => console.log(item.name + "Not Deleted"),
                style: " cancel",
              },
                {
                  text: "OK",
                  onPress: () => this.addCart(item),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ];

      return (
       
          <Swipeout left={rightButton}  autoClose={true}>
          <Animatable.View animation="fadeInRightBig" duration={2000}>
            <ListItem
            
              title={item.product.name}
             
              leftAvatar={{ source: { uri:baseUrl  + item.product.image } }}
                           
              onPress={() => navigate("OnlineShopping")}
            />
             <View style={styles.quantity}>
               <Text style={styles.textItem} >{item.qty}</Text>
               <Text style={styles.textPrice} >$ {item.qty * Number(item.product.price)} </Text>
               </View>  
            
          </Animatable.View>
        </Swipeout>
       
       
      );
    };

  
    return (
     <ScrollView>
        <FlatList
        data={this.props.cartItems.cartItems}
        renderItem={renderFavoriteItem}
        keyExtractor={(item ,index)=> index.toString()}
      />
      <View style={{ margin: 10 }}>
      <Button
        onPress={() => {
          navigate("PayCheckout");
         
        }}
        color="#808080"
        title="CHECKOUT"
      />
    </View>
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity:{
   flex:1,
   flexDirection:'row',
    backgroundColor: "#FFFFFF",
   
  },
  textPrice:{
    fontWeight:"bold",
    marginLeft: 110

  },
  textItem:{
    marginLeft: 60,
    marginBottom:23,
    height:30,
    width:30,
    color: '#fff',
    alignItems:'center',
    textAlign:"center",
    justifyContent:"center",
    fontSize: 15,
    borderRadius: 20,
    backgroundColor: "green",
    

  }
});
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
