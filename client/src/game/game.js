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
  const [leader, setLeader] = useState(false);
  const [ctzar, setCtzar] = useState("");
  let whiteData, blackData, players;
  id && CreateVars();

  useEffect(() => {
    game.child("leader").once("value", (snapshot) => {
      setLeader(snapshot.val() === id);
    });
  }, []);

  useEffect(() => {
    game.child("ctzar").on("value", (snapshot) => {
      setCtzar(snapshot.val());
    });

    leader && generateBlack();
  });

  function CreateVars() {
    whiteData = gameAccess({
      gameId: props.match.params.id,
    }).child("players");

    blackData = gameAccess({
      gameId: props.match.params.id,
      color: "black",
    });

    players = getPlayers();
  }

  function getPlayers() {
    let ids;
    ids = [];
    whiteData.on("value", (snapshot) => {
      snapshot.forEach((child) => {
        if (!ids.includes(child.key)) ids.push(child.key);
      });
      return;
    });
    return ids;
  }

  async function generateBlack() {
    let count = 0;
    await blackData.child("text").on("value", async (snapshot) => {
      if (count !== 0) return;
      if (snapshot.val() === "..." || !snapshot.exists()) {
        count++;
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

        await CalcCtzar();
      }
    });
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
    console.log(actual);
    game.child("ctzar").set(players[actual]);
  }

  async function resetWhiteCards() {
    for (let k in players) {
      whiteData.child(players[k]).child("card").set("");
    }
  }

  async function cardClick() {}

  if (id) {
    return (
      <React.StrictMode>
        <CardView game={props.match.params.id} />
        <Pick game={props.match.params.id} />
        <Hand game={props.match.params.id} />
        {ctzar === id ? <NextTurn game={props.match.params.id} /> : ""}
      </React.StrictMode>
    );
  }
  return <Redirect to="/login" />;
}

export default App;
