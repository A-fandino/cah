import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CardView from "./cardView";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBDDohjZHShK-dbbS36JlbCLm-2mVkc-cg",
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Carlos"
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
      <React.StrictMode>
        <h1>Hi {this.state.name}</h1>
        <CardView />
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
