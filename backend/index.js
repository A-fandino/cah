import Express from "express";
import fs from "fs";
import path from "path";

const app = Express();
const port = 3001;

const randIndex = (num) => {
  return Math.floor(Math.random() * num + 1);
};

app.get("/api", (req, res) => {
  //randindex
  const deck = getBlack(3);
  res.json(deck);
});
app.get("/api/:id", (req, res) => {
  const deck = getSet(req.params.id);
  res.json(deck);
});

function getSet(num = 0) {
  let rawdata = fs.readFileSync(path.resolve("src", "deck.json"));
  let student = JSON.parse(rawdata);
  return student[num];
}

function getWhite(num = 0) {
  const set = getSet(num);
  const setName = set.name;
  const deck = set.white;
  let size = -1;
  let key = {};
  for (key in deck) {
    if (deck.hasOwnProperty(key)) size++;
  }
  let card = randIndex(size - 1);
  console.log(deck[card].text);
}

function getBlack(num = 0, color) {
  const set = getSet(num);
  const setName = set.name;
  const deck = set.black;
  let size = -1;
  let key = {};
  for (key in deck) {
    if (deck.hasOwnProperty(key)) size++;
  }
  let card;
  do {
    card = randIndex(size - 1);
  } while (deck[card].pick !== 1); //THIS DO-WHILE WILL BE REMOVED WHEN THE DUAL PICK IS IMPLEMENTED
  console.log(deck[card].text);
}

app.listen(port, () => console.log("Listening on port " + port));
