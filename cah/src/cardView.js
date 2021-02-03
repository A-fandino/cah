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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class CardView extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  componentWillMount() {
    const nameRef = firebase
      .database()
      .ref()
      .child("games")
      .child("0000")
      .child("p1")
      .child("card");
    console.log(nameRef);

    nameRef.on("value", snapshot => {
      this.setState({
        name: snapshot.val()
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Black />
        <White>{this.state.name}</White>
      </React.Fragment>
    );
  }
}

export default CardView;
