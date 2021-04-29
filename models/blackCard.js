import mongoose from "mongoose";

const BlackCardSchema = mongoose.Schema({
  text: String,
  set: String,
  picks: Number,
});

export default mongoose.model("BlackCards", BlackCardSchema);
