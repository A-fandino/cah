import Card from "./cards/card";
import gameAccess from "./accessFb"

import React from 'react'

export default function CardView(props) {
    let whiteCards = []
    let blackSet
    let blackName
    for(let f=1;f<=4;f++) {
    let num = "p"+f
    const whiteCard = gameAccess({gameId: props.game, color: "white", player: num })
    whiteCard.on("value", snapshot => {
      whiteCards.push(<Card set={snapshot.child("set").val()} color="white">{snapshot.child("card").val()}</Card>)
    });
  }
    const blackCard = gameAccess({gameId: props.game, color: "black"})
    


    blackCard.on("value", snapshot => {
        blackName = snapshot.child("text").val()
        blackSet = snapshot.child("set").val()
    });
    return (
      <React.Fragment>
        <Card set={blackSet} color="black">{blackName}</Card>
        e{whiteCards}
      </React.Fragment>
    );
}

/* 
class e extends Component {
  constructor() {
    super();
    this.state = {
      wCards: [],
      whiteName: "",
      whiteSet: "",
      blackName: "",
      blackSet: ""
    };
  }
  componentDidMount() {
    
    let whiteCards = []
    for(let f=0;f<=4;f++) {
    let num = "p"+f
    const whiteCard = gameAccess({gameId: this.props.game, color: "white", player: num })
    whiteCard.on("value", snapshot => {
      /* this.setState({
        whiteName: snapshot.child("card").val(),
        whiteSet: snapshot.child("set").val()
      });
      whiteCards.push(<Card set={snapshot.child("set").val()} color="white">{snapshot.child("card").val()}</Card>)
    });
  }
  this.setState({wCards: whiteCards})
    const blackCard = gameAccess({gameId: this.props.game, color: "black"})
    


    blackCard.on("value", snapshot => {
      this.setState({
        blackName: snapshot.child("text").val(),
        blackSet: snapshot.child("set").val()
      });
    });
  }
  render() {
    console.log(1,this.wCards)
    return (
      <React.Fragment>
        <Card set={this.state.blackSet} color="black">{this.state.blackName}</Card>
        {this.wCards}
      </React.Fragment>
    );
  }
} */