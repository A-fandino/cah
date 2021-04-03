import React from "react";
import gameAccess from "./accessFb";
export default function NextTurn(props) {
  const game = gameAccess({ gameId: props.game });
  function handleClick() {
    game.child("blackCard").child("selected").set(false);
  }
  return (
    <button id="nextTurn" onClick={handleClick}>
      Next turn
    </button>
  );
}
