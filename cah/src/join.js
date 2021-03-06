import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Join() {
  let [id, setId] = useState(0);
  function handleChange(event) {
    let val = event.target.value;
    if (val >= 0 && val <= 9999) {
      setId((id = val));
    }
  }
  return (
    <div className="centered-container">
      <h1>Join Game</h1>
      <input
        id="joinInput"
        type="number"
        min="0"
        max="9999"
        onChange={handleChange}
      />
      <Link to={`game/${id}`}>
        <button id="joinButton">Join</button>
      </Link>
    </div>
  );
}
