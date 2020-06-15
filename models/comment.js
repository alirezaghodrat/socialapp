const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: {
    type: String,
    required: true 
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postingUser: {
    type: String,
    required: true
  },
  todo: {
    type: Schema.Types.ObjectId,
    ref: "Todo",
    required: true
  }
})

module.exports = mongoose.model("Comment", commentSchema)