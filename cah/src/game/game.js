import React, { useState, useEffect } from "react";
import CardView from "./cardView";
import Hand from "./hand";
import Pick from "./pick";
import NextTurn from "./nextTurn";
import gameAccess from "./accessFb";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

function App(props) {
  const cookies = new Cookies();
  const id = cookies.get("id");
  let selfWhite;
  if (id) {
    selfWhite = gameAccess({
      gameId: props.match.params.id,
      color: "white",
      player: id,
    }).child("card");
  }
  const [leader, setLeader] = useState(false);

  useEffect(() => {
    if (id) {
      const game = gameAccess({ gameId: props.match.params.id });

      game.on("value", async (snapshot) => {
        //Set current player to "leader" if the game is new
        if (!snapshot.child("leader").exists()) {
          game.child("leader").set(id);
        }

        if (snapshot.child("leader").val() === id) {
          //GenerateBlackCard();
          setLeader(true);
        }
      });

      //Manages current's player white card data
      selfWhite.set("");

      //Retrives a black card from the backend

      GenerateBlackCard();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  function GenerateBlackCard() {
    const whiteData = gameAccess({
      gameId: props.match.params.id,
    }).child("players");

    const blackData = gameAccess({
      gameId: props.match.params.id,
      color: "black",
    });
    blackData.child("selected").on("value", (snapshot) => {
      if (snapshot.val() !== true && leader) {
        fetch("/api/black")
          .then((res) => res.json())
          .then((resJson) => {
            if (resJson) {
              whiteData.remove();
              blackData.child("selected").set(true);
              blackData.child("text").set(resJson.text);
              blackData.child("set").set(resJson.set);
              blackData.child("picks").set(resJson.pick);
            }
          });
      }
    });
  }

  if (id) {
    return (
      <React.StrictMode>
        <CardView game={props.match.params.id} />
        <Pick game={props.match.params.id} />
        <Hand game={props.match.params.id} />
        {leader ? <NextTurn game={props.match.params.id} /> : "player"}
      </React.StrictMode>
    );
  }
  return <Redirect to="/login" />;
}

export default App;
