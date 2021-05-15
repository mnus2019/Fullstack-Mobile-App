import React, {useState} from "react";
import { View, FlatList, Text,StyleSheet,Share,TextInput,
  Image,
  ScrollView} from 'react-native';
import { Card,Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import ShoppingCartIcon from './ShoppingCartIconComponent';
import { addItemToCart ,deleteItemFromCart} from '../redux/ActionCreators'; 
import * as SecureStore from 'expo-secure-store';


const mapDispatchToProps = {
  addItemToCart: (item) => addItemToCart(item),
    deleteItemFromCart: (item) => deleteItemFromCart(item)
  
};





const mapStateToProps = state => {
  return {
      coffees: state.coffees,

  };
};

CoffeeShop.navigationOptions = {
  title: "Coffee Shop",
    headerRight:(
      <ShoppingCartIcon/>
    ),
  };

function CoffeeShop(props) {



  const [orderBy,setOrderBy]=useState('name');
  const [orderDir,setOrderDir]=useState('asc');
  const [queryText,setQueryText]=useState('');


     let order;
    let filteredCoffees = props.coffees.coffees;
    if(orderDir === 'asc'){
      order = 1;
    }else{
      order = -1;
    }
     filteredCoffees= filteredCoffees.sort((a,b)=>{
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

    const sharecoffees = (title, message, url) => {
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
  

    // clearAsyncStorage = async() => {
    //   SecureStore.clear();
    // }
   
  
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View
        animation='fadeInDown'
        duration={1000}
        delay={100}
       >
        
  <Card
    featuredTitle={item.name}
  
  >
     <Image style={styles.image} source={{uri: baseUrl + item.image}}/>
     <Text style={{ margin: 10 }}>{item.name}</Text>
    <Text style={{ margin: 10 }}>$ {item.price}</Text>
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
        color="#f50"
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
                sharecoffees(
                  item.name,
                  item.text,
                  item.image
                )
              }
            />

    
    </View>
  </Card>
</Animatable.View>
      );
    };
    if (props.coffees.isLoading) {
      return <Loading />;
  }
  if (props.coffees.errMess) {
      return (
          <View>
              <Text>{props.coffees.errMess}</Text>
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
  <View>
    
    <FlatList 
   data={filteredCoffees}
   renderItem={renderDirectoryItem}

   keyExtractor={item => item._id.toString()}
/>
</View>

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
},container: {
  backgroundColor: 'black',
  alignItems: 'center',
    },
searchBar: {
  fontSize: 24,
  textAlign: "center",
  margin: 10,
  width: '90%',
  height: 40,
  borderRadius: 20,
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

export default connect(mapStateToProps,mapDispatchToProps)(CoffeeShop);
