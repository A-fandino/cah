import React from "react";
//import "./index.css";
import CardView from "./cardView";
import Hand from "./hand";
import get from "./getCard";
import randIndex from "../random";
import Pick from "./pick";
import gameAccess from "./accessFb"



class App extends React.Component { 
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  componentDidMount() {
    const whiteData = gameAccess({gameId: this.props.match.params.id, color: "white", player: "p1"}).child("card")

    whiteData.set("");
    get().then(async val => {
      const blackData = gameAccess({gameId: this.props.match.params.id, color: "black"})
      let set = randIndex(70);
      let deck = val[set].black;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      let num;
      do {      
        num = randIndex(size - 1);
    	}	while(deck[num].pick !== 1) //THIS DO-WHILE WILL BE REMOVED WHEN THE DUAL PICK IS IMPLEMENTED

      blackData.on("value", snapshot => {
        if(snapshot.child("selected").val() !== true) {
          blackData.child("text").set(deck[num].text);
          blackData.child("set").set(val[set].name);
          blackData.child("picks").set(deck[num].pick);
          blackData.child("selected").set(true)
        }      
      })

    });
  }

  render() {
    return (
      <React.StrictMode>
        <CardView game={this.props.match.params.id} />
        <Pick game ={this.props.match.params.id} />
        <Hand game={this.props.match.params.id} />
      </React.StrictMode>
    );
  }
}

export default App;
//ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
