import React, { Component } from "react";
import icon from "./img/cah-icon.png";
import get from "./getCard";
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
    text: ""
  };

  render() {
    get().then(val => {
      this.setState({ text: val.black[0].text });
    });

    let divClass = "card " + this.props.color + "-card";
    console.log(divClass)
    let imgClass = "";

    if (this.props.color === "black") {
      imgClass += "invert";
    }

    return (
      <div style={style.cards} className={divClass}>
        <span className="card-header">{this.state.text}</span>
        <div className="card-bottom">
          <img className={imgClass} style={style.img} src={icon} />
          <span>Trump against humanity</span>
        </div>
      </div>
    );
  }
}
