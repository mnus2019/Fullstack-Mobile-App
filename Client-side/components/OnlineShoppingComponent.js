import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Tile } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
  };
};

class OnlineShopping extends Component {
  static navigationOptions = {
    title: "OnLine SHopping"
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            title={item.name}
            titleStyle={{
              fontSize: 24,
              fontStyle: "italic",
              opacity: 2,
              color: "#FFC0CB",
            }}
            caption={item.description}
            captionStyle={{
              fontSize: 18,
              opacity: 2,
              fontStyle: "italic",
              color: "#FFC0CB",
            }}
            featured
            onPress={() => navigate(item.title)}
              imageSrc={{ uri: baseUrl + item.image }}
                    />
        </Animatable.View>
      );
    };

    if (this.props.campsites.isLoading) {
      return <Loading />;
    }
    if (this.props.campsites.errMess) {
      return (
        <View>
          <Text>{this.props.campsites.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.campsites.campsites}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item._id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(OnlineShopping);
