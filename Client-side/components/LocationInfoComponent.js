import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  Button,
  StyleSheet,
  Alert,
  PanResponder,
  Share,
} from "react-native";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    locations: state.locations,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  postFavorite: (locationId) => postFavorite(locationId),
  postComment: (locationId, rating, author, text) =>
    postComment(locationId, rating, author, text),
};

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14,fontWeight:'bold',fontStyle:'italic' }}>{item.text}</Text>
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={10}
          onFinishRating={(rating) => this.setState({ rating: rating })}
          style={{ paddingVertical: "5%", alignItems: "flex-start" }}
        />
        <Text style={{ fontSize: 12,fontStyle:'italic' }}>
          {`-- ${item.author} , `}
          {moment(item.date).format("MMMM Do YYYY, h:mm:ss a")}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderCampsite(props) {
  const { location } = props;

  const view = React.createRef();

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false);
  const recognizeComment = ({ dx }) => (dx > 200 ? true : false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + location.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.onShowModal();
      }
      return true;
    },
  });

  const shareCampsite = (title, message, url) => {
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

  if (location) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={location.name}
          image={{ uri: baseUrl + location.image }}
        >
          <Text style={{ margin: 10 }}>{location.text}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? "thumbs-up" : "thumbs-up"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite()
              }
            />

            <Icon
              style={styles.cardItem}
              name="quote-left"
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />

            <Icon
              name={"share"}
              type="font-awesome"
              color="#90ee90"
              style={styles.cardItem}
              raised
              reverse
              onPress={() =>
                shareCampsite(
                  location.name,
                  location.description,
                  baseUrl + location.image
                )
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: "",
      text: "",
      authorError: "",
      commentError: "",
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(locationId) {
    const regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
    const value = regex.test(this.state.author);
    if (this.state.author.length < 2 || !value) {
      Alert.alert("Please Enter correct Name !!!");
      return;
    }
    if (this.state.text.length < 2) {
      Alert.alert("Please Enter comment !!!");
      return;
    }

    this.props.postComment(
      locationId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      author: "",
      text: "",
    });
  }

  markFavorite(locationId) {
    this.props.postFavorite(locationId);
  }

  static navigationOptions = {
    title: "Location Information",
  };

  render() {
    const locationId = this.props.navigation.getParam("locationId");
    const location = this.props.locations.locations.filter(
      (location) => location._id === locationId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === 0
    );
    return (
      <ScrollView>
        <RenderCampsite
          location={location}
          favorite={this.props.favorites.includes(locationId)}
          markFavorite={() => this.markFavorite(locationId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <Card style={styles.modal}>
            <Rating
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />

            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => this.setState({ author: text })}
              value={this.state.author}
            
            />

            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => this.setState({ text: text })}
              value={this.state.text}
             
            />

            <View style={{ margin: 10 }}>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(locationId);
                  this.resetForm();
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </Card>
        </Modal>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
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
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
    margin: 10 ,
    backgroundColor: "#FFFFFF"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationInfo);
