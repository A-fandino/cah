import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./game/game";
import Create from "./create";
import Join from "./join";
import Nav from "./navBar";
import Login from "./login";
import Lobby from "./lobby";
/* import Test from "./test"; */

function App() {
  return (
    <Router>
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Create} />
          <Route path="/join" exact component={Join} />
          <Route path="/lobby/:id" exact component={Lobby} />
          <Route path="/game/:id" exact component={Game} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/test" exact component={Test} /> */}
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
