import React, { useState, useEffect } from "react";
import gameAccess from "./accessFb";

export default function Pick(props) {
  const [num, setNum] = useState("");

  useEffect(() => {
    const pick = gameAccess({ gameId: props.game, color: "black" }).child(
      "picks"
    );
    pick.on("value", (snapshot) => {
      setNum(snapshot.val());
    });
  });
  return <div className="picks">Picks:{num}</div>;
}
