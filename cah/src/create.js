import React from "react";
import { Link } from "react-router-dom";
import randIndex from "./random";

export default function create() {
  return (
    <div className="centered-container">
      <h1>Welcome to Cards Against Humanity</h1>
      {/*<button className="create-button">Create Game</button>*/}
      <Link to={`/game/${randIndex(9999)}`}>
        <div className="button">
          <div className="icon">
            <img src="play.png" alt="a"></img>
          </div>
        </div>
      </Link>
      <p>Create Game</p>
    </div>
  );
}
