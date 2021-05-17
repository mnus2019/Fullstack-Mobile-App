import React, { useState} from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Picker,
  Text,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Input,Rating } from "react-native-elements";
import { postComment } from "../redux/ActionCreators";

const mapDispatchToProps = {
  postComment: (campsiteId, rating, firstName, comment) =>
    postComment(campsiteId, rating, firstName, comment),
};

Member.navigationOptions = {
  title: 'Member',
  };

function Member(props){ 

  const [firstName,setFirstName]=useState('');
  const [campsiteId,setCampsiteId]=useState("");
  const [campers,setCampers]=useState(1);
  const [lastName,setLastName]=useState('');
  const [comment,setComment]=useState('');
  const [rating,setRating]=useState(5);

  handleForm = () => {
    const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    const firstNamevalue = regex.test(firstName);
    const lastNamevalue = regex.test(lastName);
    if (firstName.length < 2 || !firstNamevalue) {
      Alert.alert("Alert", "please Enter First Name ");
      return;
    }
    if (lastName.length < 2 || !lastNamevalue) {
      Alert.alert("Alert", "please Enter  Last Name");
      return;
    }
    if (comment.length < 2) {
      Alert.alert("Please Enter comment !!!");
      return;
    }
  
    props.postComment(campsiteId, rating,firstName, comment);
    Alert.alert("Alert", "Thank you for being a Member!!!");
    props.navigation.navigate("Home");
  };

  resetForm=()=> {
    setFirstName('');
    setCampsiteId('');
    setLastName('');
    setComment('');
   
  }


    const { navigate } = props.navigation;
    return (
      <ScrollView>
        <View style={styles.modal}>
        <Rating
              showRating
              startingValue={rating}
              imageSize={40}
              onFinishRating={(rating) => setRating( rating )}
              style={{ paddingVertical: 10,margin: 10 ,backgroundColor: "#FFFFFF",}}
            />
             <Input
            style={{ height: 40, borderColor: "blue", borderWidth: 1 }}
            placeholder="Campsite Id"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(id) => setCampsiteId( id )}
            value={campsiteId}
            maxLength={16}
          />
          <Input
            style={{ height: 40, borderColor: "blue", borderWidth: 1 }}
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setFirstName( text )}
            value={firstName}
            maxLength={16}
          />

          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(text) => setLastName( text )}
            value={lastName}
            maxLength={16}
          />

          <View style={styles.MainContainer}>
            <TextInput
              style={styles.TextInputStyleClass}
              underlineColorAndroid="transparent"
              placeholder={"Type Something in Text Area."}
              placeholderTextColor={"#9E9E9E"}
              onChangeText={(text) => setComment( text )}
              value={comment}
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Contact By</Text>
            <Picker
              style={styles.formItem}
              selectedValue={campers}
              onValueChange={(itemValue) =>
                setCampers( itemValue)
              }
            >
              <Picker.Item label="Phone" value="Phone" />
              <Picker.Item label="Email" value="Email" />
            </Picker>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="Submit"
              color="#5637DD"
              onPress={() => {
                handleForm();
                resetForm();
              }}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                navigate("Home");
                  resetForm();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formRow: {
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
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 20,

    justifyContent: "flex-start",
    margin: 20,
  },
  TextInputStyleClass: {
    textAlign: "center",
    height: 10,
    borderWidth: 2,
    borderColor: "#9E9E9E",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    height: 150,
  },
});

export default connect(null, mapDispatchToProps)(Member);
