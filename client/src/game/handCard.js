import React, { useState, useEffect } from "react";
import gameAccess from "./accessFb";
import Cookies from "universal-cookie";

export default function HandCard(props) {
  const [text, setText] = useState("");
  const [setName, setSetName] = useState("");
  const cookies = new Cookies();
  const cards = gameAccess({
    gameId: props.game,
    color: "white",
    player: cookies.get("id"),
  });
  const ctzar = gameAccess({
    gameId: props.game,
  }).child("ctzar");

  useEffect(() => {
    CardValue();
  }, []);

  function CardValue() {
    fetch("/api/white/1")
      .then((res) => res.json())
      .then((resJson) => {
        setText(resJson[0].text);
        setSetName(resJson[0].set);
      });
  }

  function getCtzar() {
    let id;
    ctzar.on("value", (snapshot) => {
      id = snapshot.val();
    });
    return id;
  }

  function isCtzar() {
    return getCtzar() === cookies.get("id");
  }

  function handleClick() {
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

  let disabledClass = "";
  if (isCtzar()) {
    disabledClass = "disabled";
  }

  return (
    <div
      onClick={() => handleClick()}
      className={`card handCard white-card ${disabledClass}`}
    >
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
