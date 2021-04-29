import React from "react";
import gameAccess from "./accessFb";
export default function NextTurn(props) {
  const game = gameAccess({ gameId: props.game });
  function handleClick() {
    game.child("blackCard").child("text").set("...");
    game.child("blackCard").child("set").set("...");
  }
  return (
    <button id="nextTurn" onClick={handleClick}>
      Next turn
    </button>
  );
}
