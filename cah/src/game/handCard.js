import React, { Component } from "react";
import get from "./getCard";
import randIndex from "../random";
import gameAccess from "./accessFb";
import icon from "./img/cah-icon.png";
import style from "./cards/styles";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  state = {
    set: randIndex(70),
    text: "",
    setText: ""
  };

  componentDidMount() {
    get().then(async val => {
      let set = this.state.set;
      let deck = val[set].white;
      let size = -1;
      deck = val[set].white;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);

      this.setState({ text: deck[num].text });
      this.setState({ setText: val[set].name });
    });
  }

  handleClick() {
    let nameRef = gameAccess({gameId: this.props.game, color: "white", player: this.props.player})
    nameRef.child("card").set(this.state.text);
    nameRef.child("set").set(this.state.setText);
  }

  render() {
    return (
      <div onClick={() => this.handleClick()} className="card handCard white-card">
        <div className="overview card white-card">
          <span className="card-header">{this.state.text}</span>
          <div className="card-bottom">
            <img style={style.img} src={icon} alt="|"/>
            <span>{this.state.setText}</span>
        </div>
        </div>
        <span className="card-header">{this.state.text}</span>
      </div>
    );
  }
}

/* export default function handCard() {
  const [text, setText] = useState();
  useEffect(() => {
    get().then(val => {
      let set = randIndex(70);
      let deck = val[set].white;
      let size = -1;
      let key = {};
      for (key in deck) {
        if (deck.hasOwnProperty(key)) size++;
      }
      //console.log(val);
      let num = randIndex(size - 1);
      setText(prevText => (prevText = deck[num].text));
    });
  }, []);

  return (
    <div onClick={() => handleClick()} className="card handCard white-card">
      <div className="overview card white-card">
        <span className="card-header">
          Seeing a saint statue in the neighbor's yard.Seeing a saint statue in
          the neighbor's yard.
        </span>
      </div>
      <span className="card-header">
        Seeing a saint statue in the neighbor's yard.Seeing a saint statue in
        the neighbor's yard.
      </span>
    </div>
  );
} */
