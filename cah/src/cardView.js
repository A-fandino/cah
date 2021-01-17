import React, { Component } from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card from "./card";
import get from "./getCard";

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
class CardView extends Component {
  render() {
    return (
      <React.Fragment>
        <Card color={"white"}>
        </Card> 
        <Card color={"black"}>
        </Card>
      </React.Fragment>
    );
  }
}

export default CardView;
