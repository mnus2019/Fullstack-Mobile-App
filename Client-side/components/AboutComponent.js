import React, { Component } from "react";
import { ScrollView } from "react-native";
import { ListItem, Card, Text } from "react-native-elements";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from 'react-native-animatable';


const mapStateToProps = (state) => {
  return {
    partners: state.partners,
  };
};

function Mission() {
  return (
    <Card title="About E-Shopey">
      <Text>
     E-Shopey is an Ecommerce website, also known as electronic commerce or internet commerce, refers to 
      the buying and selling of goods or services using the internet, and the transfer of money 
       and data to execute these transactions.Flexible Coworking in Seattle. Month-to-Month Leases! All-inclusive Amenities: Private, Fully-Furnished Offices, Conference Rooms & More. Private & Shared Spaces.
       Global retail ecommerce sales are projected to reach $27 trillion by 2020.
      </Text>
    </Card>
  );
}

class About extends Component {
  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };

    if (this.props.partners.isLoading) {
      return (
        <ScrollView>
          <Mission />
          <Card title="Community Partners">
            <Loading />
          </Card>
        </ScrollView>
      );
    }
    if (this.props.partners.errMess) {
      return (
          <ScrollView>
              <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                  <Mission />
                  <Card
                      title="Community Partners">
                      <Text>{this.props.partners.errMess}</Text>
                  </Card>
              </Animatable.View>
          </ScrollView>
      );
  }
  return (
      <ScrollView>
          <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
              <Mission />
              <Card
                  title="Community Partners">
                  <FlatList
                      data={this.props.partners.partners}
                      renderItem={renderPartner}
                      keyExtractor={item=>item.id.toString()}
                  />
              </Card>
          </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
