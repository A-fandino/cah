import React, { Component } from "react";
import firebase from "firebase";
import gameAccess from "./accessFb"

//import React, { useEffect } from 'react'

/* export default function Pick(props) {
  let num;

  useEffect(() =>{
    const picks = gameAccess({gameId: props.game, color:"black"}).child("picks")
    picks.on("value", snapshot => {
      num = snapshot.val()
    });
  })

  return (
    <div className="picks">Picks:{num}</div>
  )
} */

export default class Pick extends Component {
  state = {
    num: ""
  };

  componentDidMount() {
    const pick = gameAccess({gameId: this.props.game, color:"black"}).child("picks")
    pick.on("value", snapshot => {
      this.setState({ num: snapshot.val() });
    });
  }
  render() {
    return <div className="picks">Picks:{this.state.num}</div>;
  }
}


