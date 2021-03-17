import React, { useState, useEffect } from "react";
import get from "./getCard";
import randIndex from "../random";
import gameAccess from "./accessFb";
import Cookies from "universal-cookie";

export default function HandCard(props) {
  const [text, setText] = useState("");
  const [setName, setSetName] = useState("");
  const cookies = new Cookies();
  useEffect(() => {
    CardValue();
  }, []);

  function CardValue() {
    get().then((val) => {
      let set = randIndex(70);
      let deck = val[set].white;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);
      setText(deck[num].text);
      setSetName(val[set].name);
    });
  }

  function handleClick() {
    let cards = gameAccess({
      gameId: props.game,
      color: "white",
      player: cookies.get("id"),
    });
    let oldCard;
    cards.on("value", (snapshot) => {
      oldCard = snapshot.child("card").val();
    });
    if (oldCard) {
      alert("You selected a card already");
      return;
    }

    cards.child("card").set(text);
    cards.child("set").set(setName);
    CardValue();
  }

  return (
    <div onClick={() => handleClick()} className="card handCard white-card">
      <div className="overview card white-card">
        <span className="card-header">{text}</span>
      </div>
      <span className="card-header">{text}</span>
    </div>
  );
}

/*
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    set: randIndex(70),
    text: "",
    setText: "",
  };

  componentDidMount() {
    get().then(async (val) => {
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
    const cookies = new Cookies();
    let nameRef = gameAccess({
      gameId: this.props.game,
      color: "white",
      player: cookies.get("id"),
    });
    nameRef.child("card").set(this.state.text);
    nameRef.child("set").set(this.state.setText);
    this.componentDidMount();
  }

  render() {
    return (
      <div
        onClick={() => this.handleClick()}
        className="card handCard white-card"
      >
        <div className="overview card white-card">
          <span className="card-header">{this.state.text}</span>
        </div>
        <span className="card-header">{this.state.text}</span>
      </div>
    );
  }
}*/
