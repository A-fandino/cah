import Express from "express";
import fs from "fs";
import path from "path";

const app = Express();
const port = 3001;

const randIndex = (num) => {
  return Math.floor(Math.random() * num + 1);
};

app.get("/api/black", (req, res) => {
  const deck = getBlack();
  res.json(deck);
});
app.get("/api/white/:num", (req, res) => {
  let num;
  req.params.num > 0 ? (num = req.params.num) : (num = 1);
  let cards = [];
  for (let f = 0; f < num; f++) {
    const deck = getWhite();
    cards.push(deck);
  }
  res.json(cards);
});

function getSet() {
  let rawdata = fs.readFileSync(path.resolve("src", "deck.json"));
  let student = JSON.parse(rawdata);
  return student[randIndex(70)];
}

function getWhite() {
  const set = getSet();
  const setName = set.name;
  const deck = set.white;
  let size = -1;
  let key = {};
  for (key in deck) {
    if (deck.hasOwnProperty(key)) size++;
  }
  let card = randIndex(size);
  return { text: deck[card].text, set: setName };
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

  return { text: deck[card].text, set: setName, pick: deck[card].pick };
}

app.listen(port, () => console.log("Listening on port " + port));
