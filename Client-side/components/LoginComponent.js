import React, { Component } from 'react';
import { View, StyleSheet,Alert} from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { connect } from "react-redux";
import {
    loginUser,logoutUser
  } from "../redux/ActionCreators";
  
  const mapDispatchToProps = {
    loginUser: (creds) => (loginUser(creds)),
    logoutUser: () => (logoutUser())
  };

  const mapStateToProps = state => {
    return {
        auth: state.auth
    };
  };



class LoginTab extends Component {

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
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }


  

     handleLogin =async() =>{
         
       await this.props.loginUser({ username:this.state.username,       
        password:this.state.password}
         
        );
       await  console.log(this.props.auth.isAuthenticated)
       
        resetForm=()=> { if (this.props.auth.isAuthenticated){
            this.setState({
                username:" ",
                password:" "
            })
            Alert.alert('Success!', 'user is logged in!');
          
          
            this.props.navigation.navigate("Home")
           }else{
                    
            Alert.alert("ERROR", "INCORRECT PASSWORD OR USERNAME\nPLEASE TRY AGAIN!!!"  );

           }
        }
   await resetForm();
         
                  
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
                <Input
                
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() =>{ this.handleLogin();
                            }

                          
                        }
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor: '#0000ff'}}
                    />
                </View>


                <View style={styles.formButton}>
                    <Button
                       onPress={() => this.props.navigation.navigate('Register')
                    }
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        titleStyle={{color: '#0000ff'}}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginTab);