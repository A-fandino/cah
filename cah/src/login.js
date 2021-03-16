import Cookies from "universal-cookie";
import { playerAccess } from "./game/accessFb";
import randIndex from "./random";
import React, { useState } from "react";

export default function Login() {
  const [name, useName] = useState("");
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
  function UpdateName(val) {
    useName(val);
  }

  return (
    <div className="centered-container">
      <h1>Login</h1>
      <input
        type="text"
        onChange={(event) => UpdateName(event.target.value)}
      ></input>
      <button
        onClick={() => {
          login();
        }}
      >
        Submit
      </button>
    </div>
  );
}

/* import React, { Component } from "react";
export default class Login extends Component {
  constructor() {
    super();
    = {
      name: "",
      login: false,
    };
    this.login = this.login.bind(this);
  }

  login() {
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
    players.set(this.state.name);
    cookies.set("name", this.state.name, { path: "/" });
    cookies.set("id", num, { path: "/" });
    window.location.href = "/";
  }

  render() {
    return (
      <div className="centered-container">
        <h1>Login</h1>
        <input
          type="text"
          onChange={(event) => this.setState({ name: event.target.value })}
        ></input>
        <button
          onClick={() => {
            this.login();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}
 */
