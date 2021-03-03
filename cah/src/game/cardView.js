import React, { Component } from "react";
import Card from "./cards/card";
import gameAccess from "./accessFb";
import Cookies from "universal-cookie";

class CardView extends Component {
  constructor() {
    super();
    this.state = {
      whiteName: "",
      whiteSet: "",
      blackName: "",
      blackSet: "",
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const whiteCard = gameAccess({
      gameId: this.props.game,
      color: "white",
      player: cookies.get("id"),
    });

    whiteCard.on("value", (snapshot) => {
      this.setState({
        whiteName: snapshot.child("card").val(),
        whiteSet: snapshot.child("set").val(),
      });
    });

    const blackCard = gameAccess({ gameId: this.props.game, color: "black" });

    blackCard.on("value", (snapshot) => {
      this.setState({
        blackName: snapshot.child("text").val(),
        blackSet: snapshot.child("set").val(),
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Card set={this.state.blackSet} color="black">
          {this.state.blackName}
        </Card>
        <Card set={this.state.whiteSet} color="white">
          {this.state.whiteName}
        </Card>
      </React.Fragment>
    );
  }
}

export default CardView;
