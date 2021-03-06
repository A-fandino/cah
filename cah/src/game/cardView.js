import React, { Component } from "react";
import Card from "./cards/card";
import gameAccess from "./accessFb";

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
    const whiteCard = gameAccess({
      gameId: this.props.game,
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
      console.log(cardsObj);
      this.setState({
        blackName: blackCard[0],
        blackSet: blackCard[1],
        whiteCards: cardsObj,
      });
    });
  }
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
