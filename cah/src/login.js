import React, { Component } from "react";
import Cookies from "universal-cookie";
import { playerAccess } from "./game/accessFb";
import randIndex from "./random";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
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
