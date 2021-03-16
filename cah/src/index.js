import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./game/game";
import Create from "./create";
import Join from "./join";
import Nav from "./navBar";
import Login from "./login";

function App() {
  return (
    <Router>
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Create} />
          <Route path="/join" exact component={Join} />
          <Route path="/game/:id" exact component={Game} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
