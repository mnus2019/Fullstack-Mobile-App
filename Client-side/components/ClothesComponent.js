import React, { useState } from "react";
import { View, FlatList,StyleSheet,Image, Text,Share,TextInput, ScrollView } from 'react-native';
import { Card, Icon} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addApiItemToCart, deleteApiItemFromCart } from '../redux/ActionCreators'; 

const mapDispatchToProps = {
  addApiItemToCart: (item) =>
    addApiItemToCart(item),
    deleteApiItemFromCart: (item) => deleteApiItemFromCart(item),
  
};

const mapStateToProps = state => {
  return {
      clothes: state.clothes
  };
};

ClotheShop.navigationOptions = {
  title: "Clothes Shop",
    
  headerRight:(
    <ShoppingCartIcon/>

  )
  };

function ClotheShop (props){
 

  const [orderBy,setOrderBy]=useState('name');
  const [orderDir,setOrderDir]=useState('asc');
  const [queryText,setQueryText]=useState('');
  

 
    const { navigate } = props.navigation;
    let order;
    let filteredClothes = props.clothes.clothes;
    if(orderDir === 'asc'){
      order = 1;
    }else{
      order = -1;
    }
     filteredClothes= filteredClothes.sort((a,b)=>{
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
    const shareClothes = (title, message, url) => {
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
  
    const renderClotheItem = ({ item }) => {
      return (
        <Animatable.View
        animation='fadeInDown'
        duration={1000}
        delay={100}
       >
  <Card 
    featuredTitle={item.name}
   
  >
     <Image style={styles.image} source={{ uri: item.image }}/>
  
    <Text style={{ margin: 10 }}>{item.description}</Text>
    <Text style={{ margin: 10 }}>${item.price}</Text>
    <View style={styles.cardRow}>
    <Icon
        name="plus" 
        type="font-awesome"
        color="#0F0"
        raised
        reverse
        onPress={() =>    props.addApiItemToCart(item)}
       
      />
       <Icon
        name="minus" 
        type="font-awesome"
        color="#F00"
        raised
        reverse
        onPress={() =>    props.deleteApiItemFromCart(item)}
       
      />
        <Icon
              name={"share"}
              type="font-awesome"
              color="#5637DD"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareClothes(
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

   
    if (props.clothes.isLoading) {
      return <Loading />;
  }
  if (props.clothes.errMess) {
      return (
          <View>
              <Text>{props.clothes.errMess}</Text>
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
      data={filteredClothes}
      renderItem={renderClotheItem}
      keyExtractor={item => item.id.toString()}
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
  }, 
   image: {
    width: null,
    height: 300,
    resizeMode: 'cover'
},  container: {
  backgroundColor: 'black',
  alignItems: 'center',
 
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

export default connect(mapStateToProps,mapDispatchToProps)(ClotheShop);
