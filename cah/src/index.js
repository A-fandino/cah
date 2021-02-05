import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardView from "./cardView";
import reportWebVitals from "./reportWebVitals";
import Hand from "./hand";
import firebase from "firebase";
import get from "./getCard";
import randIndex from "./random";
import Pick from "./pick";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    const whiteData = firebase
      .database()
      .ref()
      .child("games")
      .child("0000")
      .child("p1")
      .child("card");

    whiteData.set("");
    get().then(async val => {
      const blackData = firebase
        .database()
        .ref()
        .child("games")
        .child("0000")
        .child("blackCard");
      let set = randIndex(70);
      let deck = val[set].black;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);

      blackData.child("text").set(deck[num].text);
      blackData.child("set").set(val[set].name);
      blackData.child("picks").set(deck[num].pick);
    });
  }

  render() {
    return (
      <React.StrictMode>
        <CardView />
        <Pick />
        <Hand />
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
