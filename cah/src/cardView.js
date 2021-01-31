import React, { Component } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card from "./card";
import firebase from "firebase";
import get from "./getCard";
import data from "./data";

/* function getJson() {
  let aux;
  get().then(function(val) {
    return val;
  });
} */

/* export default function CardView() {
  return (
    <React.Fragment>
      <Card color={"white"}>
        Talking about the size of your penis on live TV.
      </Card>
      <Card color={"black"}>
        Talking about the size of your penis on live TV.
      </Card>
    </React.Fragment>
  );
} */

const firebaseConfig = {
  apiKey: data.key,
  authDomain: "react-cah.firebaseapp.com",
  projectId: "react-cah",
  storageBucket: "react-cah.appspot.com",
  messagingSenderId: "125556144304",
  appId: "1:125556144304:web:a37e7b5c35c1e1428fa375",
  measurementId: "G-YPJ51SQX3T"
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
      .child("object")
      .child("name");

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
        <h1>{this.state.name}</h1>
        <Card color={"black"}></Card>
        <Card color={"white"}></Card>
      </React.Fragment>
    );
  }
}

export default CardView;
