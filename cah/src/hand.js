import React, { useState } from "react";
import HandCard from "./handCard";
import get from "./getCard";
import randIndex from "./random";
/* 
class Hand extends Component {
  state = {
    set: randIndex(70),
    text: "",
    setText: ""
  };

  componentDidMount() {
    get().then(async val => {
      let set = this.state.set;
      let deck = val[set].white;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);

      this.setState({ text: deck[num].text });
      this.setState({ setText: val[set].name });
    });
  }

  render() {
    return <div className="hand">

    </div>;
  }
} */

function Hand() {
  const cards = [];
  for (let f = 0; f < 10; f++) {
    cards.push(<HandCard />);
  }

  return <div className="hand">{cards}</div>;
}

export default Hand;
