import Card from "./cards/card";
import gameAccess from "./accessFb";
import React, { Component } from "react";
import Cookies from "universal-cookie";

class CardView extends Component {
  constructor() {
    super();
    this.state = {
      blackName: "",
      blackSet: "",
      whiteCards: [],
    };
  }

  componentDidMount() {
    let cardsObj;
    const cards = gameAccess({
      gameId: this.props.game,
    });
    let blackCard = [];
    cards.on("value", (snapshot) => {
      cardsObj = [];
      const values = snapshot.child("players").val();
      for (let key in values) {
        const curr = values[key];
        cardsObj.push(
          <Card
            handleclick={this.handleClick}
            key={key}
            keyId={"card-" + key}
            set={curr.set}
            color="white"
          >
            {curr.card}
          </Card>
        );
      }
      const black = snapshot.child("blackCard");
      blackCard = [black.child("text").val(), black.child("set").val()];

      this.setState({
        blackName: blackCard[0],
        blackSet: blackCard[1],
        whiteCards: cardsObj,
      });
    });
  }

  handleClick = async (pId) => {
    const cookie = new Cookies();
    const currId = cookie.get("id");
    const gameId = this.props.game;
    const game = gameAccess({ gameId });
    game.child("blackCard").child("text").set("...");
    game.child("blackCard").child("set").set("...");
  };

  render() {
    return (
      <React.Fragment>
        <Card set={this.state.blackSet} color="black">
          {this.state.blackName}
        </Card>
        {this.state.whiteCards.map((card) => card)}
      </React.Fragment>
    );
  }
}

export default CardView;

/* import React, { useState, useEffect } from "react"; //TOO SLOW**************************************
export default function CardView(props) {
  const [blackName, setBlackName] = useState("");
  const [blackSet, setBlackSet] = useState("");
  const [whiteCards, setWhiteCards] = useState([]);

  useEffect(() => {
    let cardsObj;
    const whiteCard = gameAccess({
      gameId: props.game,
    });
    let blackCard = [];
    whiteCard.on("value", (snapshot) => {
      cardsObj = [];
      const values = snapshot.val();
      for (let key in values) {
        const curr = values[key];
        if (key !== "blackCard") {
          cardsObj.push(
            <Card key={key} set={curr.set} color="white">
              {curr.card}
            </Card>
          );
        } else {
          blackCard = [curr.text, curr.set];
        }
      }
      setBlackName(blackCard[0]);
      setBlackSet(blackCard[1]);
      setWhiteCards(cardsObj);
    });
  });

   function pushState(setArray, val) {
    setArray((old) => [...old, val]);
  }

  return (
    <React.Fragment>
      <Card set={blackSet} color="black">
        {blackName}
      </Card>
      {whiteCards.map((card) => card)}
    </React.Fragment>
  );
} */
