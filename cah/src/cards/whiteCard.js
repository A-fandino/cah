import React, { Component } from "react";
import icon from "../img/cah-icon.png";
import style from "./styles";

export default class Card extends Component {
  render() {
    let divClass = "card white-card";
    let hideClass = "";
    if (this.props.children === "") {
      hideClass = " hide";
    } else {
      hideClass = "";
    }
    return (
      <div style={style.cards} className={divClass + hideClass}>
        <span className="card-header">{this.props.children}</span>
        <div className="card-bottom">
          <img style={style.img} src={icon} />
          <span>{this.props.set}</span>
        </div>
      </div>
    );
  }
}
