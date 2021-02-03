import React, { useState } from "react";
import HandCard from "./handCard";

export default function Hand() {
  const cards = [];
  for (let f = 0; f < 10; f++) {
    cards.push(<HandCard />);
  }

  return <div className="hand">{cards}</div>;
}
