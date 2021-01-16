import React, { Component } from "react";
import icon from "./img/cah-icon.png";

const width = 250;
const height = width / 0.716;

const style = {
  cards: {
    width,
    height
  },
  img: { width: 15, marginRight: 5 }
};
export default function Card(props) {
  let divClass = "card " + props.color + "-card";

  return (
    <div style={style.cards} className={divClass}>
      <span className="card-header">
        Talking about the size of your penis on live TV.
      </span>
      <div className="card-bottom">
        <img style={style.img} src={icon} />
        <span>Trump against humanity</span>
      </div>
    </div>
  );
}
