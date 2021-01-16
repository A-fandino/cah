import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card from "./card";
export default function CardView() {
  return (
    <React.Fragment>
      <Card color={"white"} />
      <Card color={"black"} />
    </React.Fragment>
  );
}
