import React, { Component } from "react";
import get from "./getCard";
import randIndex from "../random";
import gameAccess from "./accessFb";

const nameRef = gameAccess({gameId: "0000", color: "white", player: "p1"})

export default class Card extends Component {
  state = {
    set: randIndex(70),
    text: "",
    setText: ""
  };

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    get().then(async val => {
      let set = this.state.set;
      let deck = val[set].white;
      let size = -1;
      deck = val[set].white;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);

      this.setState({ text: deck[num].text });
      this.setState({ setText: val[set].name });
    });
  }

  handleClick() {
    nameRef.child("card").set(this.state.text);
    nameRef.child("set").set(this.state.setText);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="card handCard white-card">
        <div className="overview card white-card">
          <span className="card-header">{this.state.text}</span>
        </div>
        <span className="card-header">{this.state.text}</span>
      </div>
    );
  }
}

/* export default function handCard() {
  const [text, setText] = useState();
  useEffect(() => {
    get().then(val => {
      let set = randIndex(70);
      let deck = val[set].white;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);
      setText(prevText => (prevText = deck[num].text));
    });
  }, []);

  return (
    <div onClick={() => handleClick()} className="card handCard white-card">
      <div className="overview card white-card">
        <span className="card-header">
          Seeing a saint statue in the neighbor's yard.Seeing a saint statue in
          the neighbor's yard.
        </span>
      </div>
      <span className="card-header">
        Seeing a saint statue in the neighbor's yard.Seeing a saint statue in
        the neighbor's yard.
      </span>
    </div>
  );
} */
