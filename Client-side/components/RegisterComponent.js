import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import { baseUrl } from '../shared/baseUrl';

import { connect } from "react-redux";
import {
    postRegister
  } from "../redux/ActionCreators";








  
  const mapDispatchToProps = {
    postRegister: (creds) => (postRegister(creds))
  };




class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname:'',
            lastname: '',
          
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                // this.setState({imageUrl: capturedImage.uri});
                this.processImage(capturedImage.uri);
               

            }
        }
    }
   
    processImage = async (imgUri) =>{
        
            const processedImage = await ImageManipulator.manipulateAsync(
         imgUri,
              [{ resize: { width: 400 , height: 400 } }],
              { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
            ); 

            console.log(processedImage);
            this.setState({imageUrl: processedImage.uri});
           
       
    }


    getImageFromGallery = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                // this.setState({imageUrl: capturedImage.uri});
                this.processImage(capturedImage.uri);
               

            }
        }
    }


    handleRegister=async() =>{
    const regex =/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    const nameregex = /^([a-zA-Z]+\S)*[a-zA-Z].{3,}$/;
    const usernameregex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const password = regex.test(this.state.password);
    const firstNamevalue = nameregex.test(this.state.firstName);
    const lastNamevalue =  nameregex.test(this.state.lastName);
    const usernamevalue = usernameregex.test(this.state.username);
        if (!password) {
          Alert.alert("ALERT", `Your password should have at least one special character
          two digits, two uppercase and three lowercase character & Length: 8+ ch-ers.        
          Please enter correct password !!!`);
          return;
        }
        if ( !lastNamevalue) {
          Alert.alert("ALERT","Please Enter correct firstname !!!");
          return;
        }
        if ( !firstNamevalue) {
            Alert.alert("ALERT","Please Enter correct lastname !!!");
            return;
          }
        if (!usernamevalue) {
          Alert.alert("ALERT","Please Enter correct username !!!");
          return;
        }


        //console.log(JSON.stringify(this.state));
       await this.props.postRegister(this.state);
      
       handleRemember=()=>{
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error));
        }
       }
       await handleRemember;
       await this.props.navigation.navigate("Home");
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo/logo1.jpg')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                         <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
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
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
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
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#90ee90'}}
                        />
                    </View>
                </View>
            </ScrollView>
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

export default connect(null, mapDispatchToProps)(RegisterTab);