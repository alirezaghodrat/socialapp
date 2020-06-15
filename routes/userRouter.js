const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.js");
const Issue = require("../models/todo.js");

// get watchlist
userRouter.get("/watchlist", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const watchList = await Issue.find({ _id: { $in: user.watchlist } });
    return res.status(200).send(watchList)
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// add to watchlist
userRouter.put("/watchlist/add/:_id", async (req, res, next) => {
  const { _id: issueID } = req.params;
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.watchlist.includes(issueID)) {
      res.status(200);
      return next(new Error("Already added to watchlist"));
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { watchlist: issueID } },
      { new: true }
    );
    return res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// remove from watchlist
userRouter.put("/watchlist/remove/:_id", async (req, res, next) => {
  const { _id: issueID } = req.params;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { watchlist: issueID } },
      { new: true }
    );
    return res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});



 module.exports = userRouter;