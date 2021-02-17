import React from "react";
import HandCard from "./handCard";

export default function Hand(props) {
  const cards = [];
  for (let f = 0; f < 10; f++) {
    cards.push(<HandCard player={props.player} game={props.game} key={f} />);
  }

  return <div className="hand">{cards}</div>;
}
