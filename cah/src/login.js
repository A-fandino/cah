import React, { Component } from "react";
import Cookies from "universal-cookie";
import { playerAccess } from "./game/accessFb";

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
    const players = playerAccess();
    cookies.set("id", this.state.name, { path: "/" });
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
