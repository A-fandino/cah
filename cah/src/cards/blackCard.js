import React, { Component } from "react";
import icon from "../img/cah-icon.png";
import get from "../getCard";
import randIndex from "../random";
import style from "./styles";

export default class Card extends Component {
  state = {
    set: randIndex(70),
    text: "",
    setText: ""
  };

  componentDidMount() {
    get().then(async val => {
      let set = this.state.set;
      let deck = val[set].black;
      let size = -1;
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
  render() {
    let divClass = "card black-card";
    let imgClass = "invert";
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
