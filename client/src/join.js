import React, { useState } from "react";
import gameAcces from "./game/accessFb";

export default function Join(props) {
  let [id, setId] = useState(0);
  function handleChange(event) {
    let val = event.target.value;
    if (val >= 0 && val <= 9999 && val) {
      gameAcces({ gameId: val }).once("value", (snapshot) => {
        if (snapshot.exists()) {
          setId((id = val));
        } else {
          setId((id = 0));
        }
      });
    }
  }

  function handleClick() {
    if (id) {
      props.history.push("/lobby/" + id);
      return;
    }

    alert("This game doesn't exist");
  }

  return (
    <div className="centered-container">
      <h1>Join Game</h1>
      <input
        id="unifiedInput"
        type="number"
        min="0"
        max="9999"
        onChange={handleChange}
      />
      <button id="unifiedButton" onClick={handleClick}>
        Join
      </button>
      {/* <Link to={`game/${id}`}>
        <button id="unifiedButton">Join</button>
      </Link> */}
    </div>
  );
}
