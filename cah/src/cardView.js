import React, { Component } from "react";
import "./index.css";
import Black from "./cards/blackCard";
import White from "./cards/whiteCard";
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
        <Black set={this.state.blackSet}>{this.state.blackName}</Black>
        <White set={this.state.whiteSet}>{this.state.whiteName}</White>
      </React.Fragment>
    );
  }
}

export default CardView;
