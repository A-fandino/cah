import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import reportWebVitals from "./reportWebVitals";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Game from "./game/index"
import Join from "./join"

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component = {Join} />
          <Route path="/game/:id" exact component ={Game} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
