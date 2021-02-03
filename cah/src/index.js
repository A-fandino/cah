import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardView from "./cardView";
import reportWebVitals from "./reportWebVitals";
import Hand from "./hand";
import firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    const data = firebase
      .database()
      .ref()
      .child("games")
      .child("0000")
      .child("p1")
      .child("card");

    data.set("");
  }

  render() {
    return (
      <React.StrictMode>
        <h1>a</h1>
        <CardView />
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
