import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  // },
  name: String,
});

export default mongoose.model("Users", UserSchema);
