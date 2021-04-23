import React, { Component } from "react";
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';



const mapStateToProps = state => {
  return {
      locations: state.locations
  };
};

class Location extends Component {
 

  static navigationOptions = {
    title: "Location",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
        <Tile
                    title={item.name}
                    caption={item.text}
                    featured
                    onPress={() => navigate('LocationInfo', { locationId: item._id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
                  </Animatable.View>
      );
    };

   
    if (this.props.locations.isLoading) {
      return <Loading />;
  }
  if (this.props.locations.errMess) {
      return (
          <View>
              <Text>{this.props.locations.errMess}</Text>
         </View>
      );
  }
  return (
      <FlatList 
      data={this.props.locations.locations}
      renderItem={renderDirectoryItem}
      keyExtractor={item => item._id.toString()}
  />
    );
  }
}

export default connect(mapStateToProps)(Location);
