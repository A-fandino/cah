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
    num: randIndex(),
    text: ""

  };
  render() {
    
    get().then(val => {
     const num = this.state.num
     if (this.props.color === "white") {
        this.setState({ text: val.white[num] });
     } else {
        this.setState({ text: val.black[num].text });
     }})
     
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
          <span>Trump against humanity</span>
        </div>
      </div>
    );
  }


}

function randIndex () {
  return Math.floor(Math.random()*150 +1);
}