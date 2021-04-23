import React, { Component } from "react";
import { View, Text, Animated, Image } from 'react-native';
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    coffees: state.coffees,
  suites: state.suites,
  clothes: state.clothes,
   
  };
};

function RenderItem(props) {
  const { item } = props;

  if (props.isLoading) {
    return <Loading />;
  }
  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  if (item) {
    return (
      <Card 
      featuredTitle={item.name}
       image={{ uri: baseUrl+item.image}}
       
       >
        
        <Text style={{ margin: 10 }}>{item.text}</Text>
      </Card>
    );
  }
  return <View />;
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
        scaleValue: new Animated.Value(0)
    };
}

animate() {
  Animated.timing(
      this.state.scaleValue,
      {
          toValue: 1,
          duration: 1500
      }
  ).start();
}

componentDidMount() {
  this.animate();
}

  static navigationOptions = {
    title: "Home",
  };

  render() {
    return (
      <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
      <RenderItem
          item={this.props.coffees.coffees.filter(coffee => coffee.id==1)[0]}
          isLoading={this.props.coffees.isLoading}
          errMess={this.props.coffees.errMess}
      />
        <RenderItem
          item={this.props.suites.suites.filter(suite => suite.id==1)[0]}
          isLoading={this.props.suites.isLoading}
          errMess={this.props.suites.errMess}
      />
          <RenderItem
          item={this.props.clothes.clothes.filter(cloth=>cloth.price==60)[0]}
          isLoading={this.props.clothes.isLoading}
          errMess={this.props.clothes.errMess}
      />
      
  </Animated.ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
