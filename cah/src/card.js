import React, { Component } from "react";
import icon from "./img/cah-icon.png";
import get from "./getCard";
import { STATUS_CODES } from "http";
const width = 250;
const height = width / 0.716;
const style = {
  cards: {
    width,
    height
  },
  img: { width: 15, marginRight: 5 }
};
export default class Card extends Component {
  state = {
    set: randIndex(70),
    text: "",
    setText: ""
  };
  static getDerivedStateFromProps(props, state) {
    get().then(async val => {
      let deck;
      let set = /*this.*/ state.set;
      let size = -1;
      if (/*this.*/ props.color === "white") {
        deck = val[set].white;
      } else {
        deck = val[set].black;
      }
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      let num = randIndex(size - 1);
      ///*this.*/ setState({ text: deck[num].text });
      ///*this.*/ setState({ setText: val[set].name });
    });
  }

  render() {
    let divClass = "card " + this.props.color + "-card";
    let imgClass = "";

    if (this.props.color === "black") {
      imgClass += "invert";
    }

    return (
      <div style={style.cards} className={divClass}>
        <span className="card-header">{this.state.text}</span>
        <div className="card-bottom">
          <img className={imgClass} style={style.img} src={icon} />
          <span>{this.state.setText}</span>
        </div>
      </div>
    );
  }
}

const randIndex = num => {
  return Math.floor(Math.random() * num + 1);
};
