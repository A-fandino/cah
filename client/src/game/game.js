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

  let whiteData, blackData, players;
  id && CreateVars();

  useEffect(async () => {
    await game.child("leader").once("value", async (snapshot) => {
      setLeader(snapshot.val() === id);
    });
  }, []);

  useEffect(() => {
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

  function generateBlack() {
    blackData.child("text").on("value", async (snapshot) => {
      console.log("a");
      if (snapshot.val() === "...") {
        console.log("b");
        fetch("/api/black")
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
    });
  }

  async function resetWhiteCards() {
    for (let k in players) {
      whiteData.child(players[k]).child("card").set("");
    }
  }

  if (id) {
    return (
      <React.StrictMode>
        <CardView game={props.match.params.id} />
        <Pick game={props.match.params.id} />
        <Hand game={props.match.params.id} />
        {leader ? <NextTurn game={props.match.params.id} /> : ""}
      </React.StrictMode>
    );
  }
  return <Redirect to="/login" />;
}

export default App;
