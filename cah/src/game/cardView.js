import React, { Component } from "react";
import Card from "./cards/card";
import gameAccess from "./accessFb";
//import Cookies from "universal-cookie";

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
    //const cookies = new Cookies();
    const whiteCard = gameAccess({
      gameId: this.props.game,
    });
    let cardsObj = [];
    let blackCard = [];
    whiteCard.on("value", (snapshot) => {
      const values = snapshot.val();
      for (let key in values) {
        const curr = values[key];
        if (key !== "blackCard") {
          cardsObj.push([key, curr.card, curr.set]);
        } else {
          blackCard = [curr.text, curr.set];
        }
      }

      this.setState({
        blackName: blackCard[0],
        blackSet: blackCard[1],
        whiteCards: cardsObj,
      });
      console.log(this.state.blackName, blackCard);
    });
    /*const blackCard = gameAccess({ gameId: this.props.game, color: "black" });

    blackCard.on("value", (snapshot) => {
      this.setState({
        blackName: snapshot.child("text").val(),
        blackSet: snapshot.child("set").val(),
      });
    }); */
  }
  render() {
    return (
      <React.Fragment>
        <Card set={this.state.blackSet} color="black">
          {this.state.blackName}
        </Card>
        {/* <Card set={this.state.whiteSet} color="white">
          {this.state.whiteName}
        </Card> */}

        {this.state.whiteCards.map((card) => {
          return (
            <Card key={card[0]} set={card[2]} color="white">
              {card[1]}
            </Card>
          );
        })}
      </React.Fragment>
    );
  }
}

export default CardView;
