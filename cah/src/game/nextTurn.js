import React from "react";
import gameAccess from "./accessFb";
export default function NextTurn(props) {
  function handleClick() {
    const game = gameAccess({ gameId: props.game });
    game.child("blackCard").child("selected").set(false);
  }
  return <button onClick={handleClick}>Next turn</button>;
}
