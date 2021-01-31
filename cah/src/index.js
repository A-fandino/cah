import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardView from "./cardView";
import reportWebVitals from "./reportWebVitals";
import Hand from "./hand";
import HandCard from "./handCard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  /* componentWillMount() {
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
  } */

  render() {
    return (
      <React.StrictMode>
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
