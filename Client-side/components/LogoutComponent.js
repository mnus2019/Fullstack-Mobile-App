import React, { Component } from 'react';
import { View, StyleSheet,Alert} from 'react-native';
import {  Button, Icon,Card,Text } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { connect } from "react-redux";
import {
    logoutUser
  } from "../redux/ActionCreators";
  
  const mapDispatchToProps = {
   
    logoutUser: () => (logoutUser())
  };

  const mapStateToProps = state => {
    return {
        auth: state.auth
    };
  };



class LogoutTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            success:false

        };
    }

    static navigationOptions = {
        title: 'Logout',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-out'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }


    handleLogout =async() =>{
      await  this.props.logoutUser();
      await  console.log(this.props.auth.isAuthenticated)

      if (this.props.auth.isAuthenticated == false){
     
        Alert.alert('Success!', 'No user is logged in anymore!');
      
      
        this.props.navigation.navigate("Login")
       }
    

    }

  

         

    
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
      
        return (
            <View style={styles.container}>
             
             <Card  title="YOU ARE ABOUT TO LOGOUT">
      <Text style={{color:"rgba(95,197,123,0.8)"}}>
     E-Shopey is an Ecommerce website, also known as electronic commerce or internet commerce, refers to 
      the buying and selling of goods or services using the internet, and the transfer of money 
       and data to execute these transactions.Flexible Coworking in Seattle. Month-to-Month Leases! All-inclusive Amenities: Private, Fully-Furnished Offices, Conference Rooms & More. Private & Shared Spaces.
       Global retail ecommerce sales are projected to reach $27 trillion by 2020.

            </Text>
          <Card >
          <Text style={{color:"#f00"}}>
            Don't despair if you find out that you made an error. ...

            This action will not be repeated once you Logout!!

            Are you sure you wish to logout?
            </Text>
          </Card>
    </Card>

               
                <View style={styles.formButton}>
                    <Button
                        onPress={() =>{ this.handleLogout();
                            }

                          
                        }
                        title='LogOut'
                        icon={
                            <Icon
                                name='sign-out'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor: '#f00'}}
                    />
                </View>

               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutTab);