import React from "react";
import icon from "../img/cah-icon.png";
import style from "./styles";

export default function card(props) {
  let divClass = "card " + props.color + "-card";
  let hideClass = "";
  let imgClass = "";
  if (props.color === "white" && !props.children) {
    hideClass = " hide";
  }
  if (props.color === "black") {
    imgClass = "invert";
  }

  return (
    <div
      id={props.keyId}
      onClick={(e) => {
        props.handleclick(e.currentTarget.id);
      }}
      style={style.cards}
      className={divClass + hideClass}
    >
      <span className="card-header">{props.children}</span>
      <div className="card-bottom">
        <img className={imgClass} style={style.img} src={icon} alt="|" />
        <span>{props.set}</span>
      </div>
    </div>
  );
}
