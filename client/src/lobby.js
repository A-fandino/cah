import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import gameAcces from "./game/accessFb";

export default function Lobby(props) {
  const cookies = new Cookies();
  const id = cookies.get("id");
  const [numPlayers, setPlayers] = useState(0);
  const [leader, setLeader] = useState(false);

  const minPlayers = 2;

  const game = gameAcces({ gameId: props.match.params.id });
  const players = game.child("players");
  checkSession();

  useEffect(() => {
    if (id) {
      game.on("value", (snapshot) => {
        if (snapshot.child("leader").val() === id) {
          setLeader(true);
        } else if (!snapshot.child("leader").exists()) {
          game.child("leader").set(id);
          setLeader(true);
        }
      });
      players.on("value", (snapshot) => {
        players.child(id).child("set").set("");
        setPlayers(snapshot.numChildren());
      });
      game.child("blackCard").on("value", (snapshot) => {
        if (snapshot.exists()) {
          props.history.push(`/game/${props.match.params.id}`);
        }
      });
    }
  });

  function checkSession() {
    if (!id) {
      props.history.push("/login");
      return;
    }
    game.once("value", (snapshot) => {
      if (snapshot.child("blackCard").exists()) props.history.push("/");
    });
  }

  function startGame() {
    game.child("blackCard").set("");
  }
  return (
    <div className="container">
      <div className="centered-container">
        <h1>Game: {props.match.params.id}</h1>
        <p>
          Players: {numPlayers}/{minPlayers}
        </p>
        {leader ? ( //IF LEADER
          <button
            onClick={startGame}
            className={`default ${numPlayers < minPlayers && "disabled"}`}
          >
            Play
          </button>
        ) : (
          // ELSE
          <p>Wait for the leader to start the game</p>
        )}
      </div>
    </div>
  );
}
