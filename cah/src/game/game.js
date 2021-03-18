import React, { useState, useEffect } from "react";
//import "./index.css";
import CardView from "./cardView";
import Hand from "./hand";
import get from "./getCard";
import randIndex from "../random";
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

      //Retrives a black card from /public/deck.json

      GenerateBlackCard();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  function GenerateBlackCard() {
    get().then(async (val) => {
      const whiteData = gameAccess({
        gameId: props.match.params.id,
      }).child("players");
      const blackData = gameAccess({
        gameId: props.match.params.id,
        color: "black",
      });

      blackData.child("selected").on("value", (snapshot) => {
        if (snapshot.val() !== true && leader) {
          whiteData.remove();
          let set = randIndex(70);
          let deck = val[set].black;
          let size = -1;
          let key = {};
          for (key in deck) {
            if (deck.hasOwnProperty(key)) size++;
          }
          let num;
          do {
            num = randIndex(size - 1);
          } while (deck[num].pick !== 1); //THIS DO-WHILE WILL BE REMOVED WHEN THE DUAL PICK IS IMPLEMENTED
          blackData.child("selected").set(true);
          blackData.child("text").set(deck[num].text);
          blackData.child("set").set(val[set].name);
          blackData.child("picks").set(deck[num].pick);
        }
      });
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
