import Express from "express";
import path from "path";
import apiRoute from "./routes/api.js";
// import userRoute from "./routes/user.js";
// import gameRoute from "./routes/game.js";
// import mongoose from "mongoose";
import dotenv from "dotenv";
let __dirname = path.resolve(path.dirname(""));
const app = Express();

app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);
app.use(Express.static(path.join(__dirname, "client/build")));

dotenv.config();
// mongoose.connect(
//   process.env.CONNECTION,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => console.log("Connected to mongoose ඞ")
// );

app.use("/api", apiRoute);
// app.use("/user", userRoute);
// app.use("/game", gameRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
