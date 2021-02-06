import React, { Component } from "react";
import Card from "./cards/whiteCard";
import data from "./data";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: data.key,
  authDomain: data.authDomain,
  projectId: data.projectId,
  storageBucket: data.storageBucket,
  messagingSenderId: data.messagingSenderId,
  appId: data.appId,
  measurementId: data.measurementId
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
firebase.analytics();

class CardView extends Component {
  constructor() {
    super();
    this.state = {
      whiteName: "",
      whiteSet: "",
      blackName: "",
      blackSet: ""
    };
  }

  componentDidMount() {
    const whiteCard = firebase
      .database()
      .ref()
      .child("games")
      .child("0000")
      .child("p1");

    const blackCard = firebase
      .database()
      .ref()
      .child("games")
      .child("0000")
      .child("blackCard");

    whiteCard.on("value", snapshot => {
      this.setState({
        whiteName: snapshot.child("card").val(),
        whiteSet: snapshot.child("set").val()
      });
    });

    blackCard.on("value", snapshot => {
      this.setState({
        blackName: snapshot.child("text").val(),
        blackSet: snapshot.child("set").val()
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Card set={this.state.blackSet} color="black">{this.state.blackName}</Card>
        <Card set={this.state.whiteSet} color="white">{this.state.whiteName}</Card>
      </React.Fragment>
    );
  }
}

export default CardView;
