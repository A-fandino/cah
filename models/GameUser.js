import mongoose from "mongoose";

const GameUserSchema = mongoose.Schema({
  card: String,
  set: String,
});

export default mongoose.model("GameUsers", GameUserSchema);
