import express from "express";
import Game from "../models/Game.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const game = await Game.find();
    res.json(game);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const game = new Game({
    _id: req.body.id,
    ctzar: req.body.ctzar,
    leader: req.body.leader,
    blackCard: req.body.blackCard,
    white: req.body.white,
  });
  try {
    const newGame = await game.save();
    res.json({ newGame });
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedGame = await Game.deleteOne({ _id: req.params.id });
    res.json({ removedGame });
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
