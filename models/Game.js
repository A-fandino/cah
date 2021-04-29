import mongoose from "mongoose";
import BlackCards from "./blackCard.js";
import GameUsers from "./GameUser.js";

const GameSchema = mongoose.Schema({
  _id: Number,
  ctzar: String,
  leader: String,
  blackCard: BlackCards.schema,
  white: [GameUsers.schema],
});

export default mongoose.model("Games", GameSchema);
