import Express from "express";
import path from "path";
import apiRouter from "./routes/api.js";

const app = Express();
const port = 3001;

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  let __dirname = path.resolve(path.dirname(""));
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => console.log("Listening on port " + port));
