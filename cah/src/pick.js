import React, { Component } from "react";
import firebase from "firebase";

const pick = firebase
  .database()
  .ref()
  .child("games")
  .child("0000")
  .child("blackCard")
  .child("picks");
export default class Pick extends Component {
  state = {
    num: ""
  };

  componentDidMount() {
    pick.on("value", snapshot => {
      console.log("aaaaaaaaaa", snapshot.val());
      this.setState({ num: snapshot.val() });
    });
  }
  render() {
    return <div className="picks">Picks:{this.state.num}</div>;
  }
}
