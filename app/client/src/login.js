import Cookies from "universal-cookie";
import { playerAccess } from "./game/accessFb";
import randIndex from "./random";
import React, { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  function login() {
    const cookies = new Cookies();
    const playersList = playerAccess();
    let snap;
    playersList.on("value", (snapshot) => {
      snap = snapshot.val();
    });
    let num;
    do {
      num = randIndex(1000);
    } while (snap && num in snap);
    const players = playerAccess().child(num);
    players.set(name);
    cookies.set("name", name, { path: "/" });
    cookies.set("id", num, { path: "/" });
    window.location.href = "/";
  }

  return (
    <div className="centered-container">
      <h1>Login</h1>
      <input
        id="unifiedInput"
        type="text"
        onChange={(event) => setName(event.target.value)}
      ></input>
      <button
        id="unifiedButton"
        onClick={() => {
          login();
        }}
      >
        Submit
      </button>
    </div>
  );
}
