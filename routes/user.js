import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/id/:name", async (req, res) => {
  try {
    const users = await User.find({ name: req.params.name }, { _id: 1 });

    for (let i = 0; i < users.length; i++) {
      users[i] = users[i]._id;
    }

    res.send(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/name/:id", async (req, res) => {
  try {
    const name = await User.findOne(
      { _id: req.params.id },
      { _id: 0, name: 1 }
    );
    res.send(name.name);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ id: req.params.id });
    res.json({ removedUser });
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
