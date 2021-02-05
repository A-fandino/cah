import React, { Component } from "react";
import icon from "../img/cah-icon.png";
import style from "./styles";

export default class Card extends Component {
  render() {
    let divClass = "card black-card";
    let imgClass = "invert";

    return (
      <div style={style.cards} className={divClass}>
        <span className="card-header">{this.props.children}</span>
        <div className="card-bottom">
          <img className={imgClass} style={style.img} src={icon} />
          <span>{this.props.set}</span>
        </div>
      </div>
    );
  }
}
