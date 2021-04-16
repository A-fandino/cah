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

  const game = gameAccess({ gameId: props.match.params.id });
  let whiteData;
  let blackData;
  let players;

  if (id) {
    whiteData = gameAccess({
      gameId: props.match.params.id,
    }).child("players");

    blackData = gameAccess({
      gameId: props.match.params.id,
      color: "black",
    });

    players = getPlayers();
  }

  const [ctzar, setCtzar] = useState("");
  const [leader, setLeader] = useState("");

  useEffect(() => {
    if (id) {
      game.once("value", async (snapshot) => {
        setLeader(snapshot.child("leader").val());
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (id) {
      game.child("ctzar").on("value", (snapshot) => {
        setCtzar(snapshot.val());
      });

      leader === id && GenerateBlackCard();
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  async function GenerateBlackCard() {
    await blackData.child("selected").on("value", async (snapshot) => {
      if (!snapshot.val()) {
        blackData.child("selected").set(true);
        await SetCard();
        await CalcCtzar();
      }
    });
  }

  async function SetCard() {
    await fetch("/api/black")
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson) {
          resetWhiteCards();
          blackData.child("text").set(resJson.text);
          blackData.child("set").set(resJson.set);
          blackData.child("picks").set(resJson.pick);
        }
      });
  }

  async function resetWhiteCards() {
    for (let k in players) {
      whiteData.child(players[k]).child("card").set("");
    }
  }

  function getPlayers() {
    let ids;
    ids = [];
    whiteData.on("value", (snapshot) => {
      for (let k in snapshot.val()) {
        if (!ids.includes(k)) {
          ids.push(k);
        }
      }
      return;
    });
    return ids;
  }

  async function CalcCtzar() {
    let actual = 0;
    if (ctzar) {
      actual = players.indexOf(ctzar);
      actual++;
      if (actual >= players.length) {
        actual = 0;
      }
    }
    game.child("ctzar").set(players[actual]);
  }

  if (id) {
    return (
      <React.StrictMode>
        <CardView game={props.match.params.id} />
        <Pick game={props.match.params.id} />
        <Hand game={props.match.params.id} />
        {leader === id ? <NextTurn game={props.match.params.id} /> : "player"}
      </React.StrictMode>
    );
  }
  return <Redirect to="/login" />;
}

export default App;
