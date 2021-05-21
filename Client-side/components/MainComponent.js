import React, { useEffect } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ToastAndroid,Alert
} from "react-native";
import Home from "./HomeComponent";
import OnlineShopping from "./OnlineShoppingComponent";
import CoffeeShop from "./CoffeeComponent";
import About from "./AboutComponent";
import Member from "./MemberComponent";
import SuiteShop from "./SuitesComponent";
import ClotheShop from "./ClothesComponent";
import MyCart from "./MyCartComponent";
import LoginTab from "./LoginComponent";
import PayCheckout from "./PaymentComponent";
import LogoutTab from "./LogoutComponent";
import RegisterTab from "./RegisterComponent";
import LocationInfo from "./LocationInfoComponent";
import Location from "./LocationComponent";
import { Icon } from "react-native-elements";
import {
  createBottomTabNavigator ,
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation";
// import {useNavigation} from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import {
  fetchCoffees,
  fetchSuites,
  fetchComments,
  fetchCampsites,
  fetchClothes,
  fetchLocations,
  fetchPartners,logoutUser
} from "../redux/ActionCreators";

const mapDispatchToProps = {
  fetchCoffees,
  fetchPartners,
  fetchComments,
  fetchSuites,
  fetchCampsites,
  fetchClothes,
  fetchLocations,
  logoutUser

};
const mapStateToProps = state => {
  return {
      auth: state.auth
  };
};






const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#37dd50',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
          name="align-justify"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),  
    }),
  }
);
const CartScreenNavigator = createStackNavigator(

  {
    MyCart: {
      screen: MyCart,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
          name="align-justify"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),  
      }),
    },
    PayCheckout: { screen: PayCheckout },
  },
  {
    initialRouteName: "MyCart",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#37dd50',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }

 
);


const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#37dd50',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
        name="align-justify"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),  
    }),
  }
);
const LocationNavigator = createStackNavigator(
  {
    Location: {
      screen: Location,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
          name="align-justify"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),  
      }),
    },
    LocationInfo: { screen: LocationInfo },
  },
  {
    initialRouteName: "Location",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#37dd50',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);
const MemberNavigator = createStackNavigator(
  {
    Member: { screen: Member },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#37dd50',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
        name="align-justify"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),  
      
    }),
  }
);

const OnlineShoppingNavigator = createStackNavigator(
  {
    OnlineShopping: {
      screen: OnlineShopping,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
          name="align-justify"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        
      }),
    },
    CoffeeShop: { screen: CoffeeShop },
    SuiteShop: { screen: SuiteShop },
    ClotheShop: { screen: ClotheShop },
  },

  {
    initialRouteName: "OnlineShopping",
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#90ee90',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);
const LoginNavigator = createStackNavigator(
  {
    LoginTab: { screen: LoginTab },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#90ee90',
      },
      
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
        
    }),
  }
);


const LogoutNavigator = createStackNavigator(
  {
    LogoutTab: { screen: LogoutTab },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#90ee90',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: (
        <Icon
        name="align-justify"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    
    }),
  }
);


const RegisterNavigator = createStackNavigator(
  {
    RegisterTab: { screen: RegisterTab },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#90ee90',
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
     
    }),
  }
);
const BottomNavigator = createBottomTabNavigator(
  {
    Login: LoginNavigator,
    Register: RegisterNavigator
  },
  {
      tabBarOptions: {
          activeBackgroundColor: '#0000ff',
          inactiveBackgroundColor: '#CEC8FF',
          activeTintColor: '#fff',
          inactiveTintColor: '#808080',
          labelStyle: {fontSize: 16}
      }, 
  }
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo/logo2.jpg")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>E-Shopey</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
   
    Register: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="user-plus"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    MyCart: {
      screen: CartScreenNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
          name="cart-arrow-down"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Location: {
      screen: LocationNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="street-view"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    OnlineShopping: {
      screen: OnlineShoppingNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="archive"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="bullhorn"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Member: {
      screen: MemberNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
    Logout: {
      screen: LogoutNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="sign-out"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    drawerBackgroundColor: "green",
    contentComponent: CustomDrawerContentComponent,
  },
  {
    
    contentComponent: BottomNavigator,
  }
);
const Main=(props)=>  {
 
 
  useEffect(()=>{
    props.fetchCoffees();
    props.fetchSuites();
    props.fetchCampsites();
    props.fetchClothes();
    props.fetchLocations();
    props.fetchComments();
    props.fetchPartners();


  

   const showNetInfo= async ()=> {
      const connectionInfo = await NetInfo.fetch();
      if (connectionInfo) {
        Platform.OS === "ios"
          ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
          : ToastAndroid.show(
              "Initial Network Connectivity Type: " + connectionInfo.type,
              ToastAndroid.LONG
            );
      }
    }
    showNetInfo();

  unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
   
    });
  },[])



 

  handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    Platform.OS === "ios"
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

 
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor:'#37dd50',
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    margin: 10,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 40,
    width: 40,
    // backgroundColor:'#37dd50',
    borderWidth: 1,
    borderColor: "#9E9E9E",
    borderRadius: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
