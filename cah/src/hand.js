import React, { Component } from "react";
import HandCard from "./handCard";

/* class Hand extends Component {
  state = {
    tags:[]
  };

  render() {
    return (
      <div className="hand">
        <Card />
      </div>
    );
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
