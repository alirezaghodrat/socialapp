const express = require("express");
const commentRouter = express.Router();
const Issue = require('../models/todo.js')
const Comment = require("../models/comment.js");

// get comment
commentRouter.get("/:_id", (req, res, next) => {
  Comment.find({todo: req.params._id}, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})
 
//post the comment on the scream as an aray ? order by the lastest ????????? 
// i want when i get sceama see the comment as a array and comment count pulse when we commenting
// /scream/:screamId/comment
//and i have to make a sprate function for comment on comment ??
commentRouter.post("/:_id", (req, res, next) => {
  req.body.user = req.user._id;
  req.body.todo = req.params._id;
  req.body.postingUser = req.user.username;
  const newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(comment);
  });
});

module.exports = commentRouter;