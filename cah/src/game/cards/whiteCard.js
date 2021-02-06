import React, { Component } from "react";
import icon from "../img/cah-icon.png";
import style from "./styles";

export default class Card extends Component {
  render() {
    let divClass = "card "+this.props.color+"-card";
    let hideClass = "";
    let imgClass = "";
    if (this.props.color === "white" && this.props.children === "") {
      hideClass = " hide";
    }
    if (this.props.color === "black") {
    imgClass = "invert";
  }
    return (
      <div style={style.cards} className={divClass + hideClass}>
        <span className="card-header">{this.props.children}</span>
        <div className="card-bottom">
          <img className = {imgClass}style={style.img} src={icon} alt="|"/>
          <span>{this.props.set}</span>
        </div>
      </div>
    );
  }
}
