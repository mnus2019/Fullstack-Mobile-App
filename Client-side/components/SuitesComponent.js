import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet,Image,TextInput,
   ScrollView,Share } from 'react-native';
import { Card, Icon } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addItemToCart,deleteItemFromCart } from '../redux/ActionCreators'; 
import MyCart from "./MyCartComponent"



const mapStateToProps = state => {
  return {
      suites: state.suites
  };
};

const mapDispatchToProps = {
  addItemToCart: (item) =>
    addItemToCart(item),
    deleteItemFromCart: (item) =>deleteItemFromCart(item),
};


    
SuiteShop.navigationOptions = {
  title: "Rent Coworking Place",
    headerRight:(
      <ShoppingCartIcon/>
    ),
  };

function SuiteShop(props) {
 


 
const [orderBy,setOrderBy]=useState('name');
const [orderDir,setOrderDir]=useState('asc');
const [queryText,setQueryText]=useState('');


 
    let order;
    let filteredSuites = props.suites.suites;
    if(orderDir === 'asc'){
      order = 1;
    }else{
      order = -1;
    }
     filteredSuites= filteredSuites.sort((a,b)=>{
      if(a[orderBy].toLowerCase() <
         b[orderBy].toLowerCase()
         ){
           return -1 * order;
         }else{
           return  1 * order;
         }
 
    })
    .filter(eachItem => {
      return(
        eachItem['name'] 
        .toLowerCase()
       .includes(queryText.toLowerCase()) ||
        eachItem['price']
        .toLowerCase()
       .includes(queryText.toLowerCase()) ||
        eachItem['text']
        .toLowerCase()
       .includes(queryText.toLowerCase()) 
      );
    })
    const shareSuites = (title, message, url) => {
      Share.share(
        {
          title: title,
          message: `${title}: ${message} ${url}`,
          url: url,
        },
        {
          dialogTitle: "Share " + title,
        }
      );
    };
    const { navigate } = props.navigation;
  
    const renderSuiteItem = ({ item }) => {

      

      return (
        <Animatable.View
        animation='fadeInDown'
        duration={1000}
        delay={100}>
  <Card
    featuredTitle={item.name}
      
  >
      <Image style={styles.image} source={{uri: baseUrl + item.image}}/>
     <Text style={{ margin: 10 }}>{item.name}</Text>
    <Text style={{ margin: 10 }}>${item.price}</Text>
    <View style={styles.cardRow}>
      <Icon
        name="plus" 
        type="font-awesome"
        color="#0F0"
        raised
        reverse
        onPress={() =>    props.addItemToCart(item)}
       
      />
       <Icon
        name="minus" 
        type="font-awesome"
        color="#F00"
        raised
        reverse
        onPress={() =>    props.deleteItemFromCart(item)}
       
      />
       <Icon
              name={"share"}
              type="font-awesome"
              color="#5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareSuites(
                  item.name,
                  item.description,
                  item.image
                )
              }
            />

    
    </View>
  </Card>
</Animatable.View>
      );
    };

   
    if (props.suites.isLoading) {
      return <Loading />;
  }
  if (props.suites.errMess) {
      return (
          <View>
              <Text>{props.suites.errMess}</Text>
         </View>
      );
  }
  return (
  <ScrollView>
      <View style={styles.container}>
        <TextInput
        placeholder=" Search Here"
        onChangeText={(search) => setQueryText(search)}
          style={styles.searchBar}
        />
    
      </View>
        <FlatList 
      data={filteredSuites}
      renderItem={renderSuiteItem}
      keyExtractor={item => item._id.toString()}
  />
 </ScrollView>
    
    );
  }


const styles=StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardItem: {
    margin: 10,
    flex: 1,
  } ,
   image: {
    width: null,
    height: 300,
    resizeMode: 'cover'
},
modal: {
  justifyContent: "center",
  margin: 20,
},  container: {
  backgroundColor: 'black',
  alignItems: 'center',
  // height: '100%',
},
searchBar: {
  fontSize: 24,
  textAlign: "center",
  borderRadius: 20,
  margin: 10,
  width: '90%',
  height: 40,
  backgroundColor: 'white',
},
itemText: {
  margin: 10,
  color: 'white',
  fontSize: 24,
  backgroundColor: 'blue',
  width: '100%',
  height: 50
}
})

export default connect(mapStateToProps,mapDispatchToProps)(SuiteShop);
