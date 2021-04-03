import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import gameAcces from "./game/accessFb";

export default function Lobby(props) {
  const cookies = new Cookies();
  const id = cookies.get("id");
  const [numPlayers, setPlayers] = useState(0);
  const [leader, setLeader] = useState(false); //Checks if the current players is the leader
  const [isGame, setIsGame] = useState(false); //Checks if  the games should start

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
          setIsGame(true);
          //props.history.push(`/game/${props.match.params.id}`);
        }
      });
    }
  });

  function checkSession() {
    if (!id) {
      props.history.push("/login");
      return;
    }
    if (leader) return;
    game.once("value", (snapshot) => {
      if (snapshot.child("blackCard").exists()) {
        props.history.push("/");
        alert("Could not join the game");
      }
    });
  }

  function startGame() {
    game.child("blackCard").set("");
  }
  if (!isGame) {
    return (
      <div className="container">
        <div className="centered-container">
          <h1>Game: {props.match.params.id}</h1>
          <p>
            Players: {numPlayers}/{minPlayers}
          </p>
          {leader ? ( //if (leader)
            <button
              onClick={startGame}
              className={`default ${numPlayers < minPlayers && "disabled"}`}
            >
              Play
            </button>
          ) : (
            // else
            <p>Wait for the leader to start the game</p>
          )}
        </div>
      </div>
    );
  }
  return <Redirect to={`/game/${props.match.params.id}`} />;
}
