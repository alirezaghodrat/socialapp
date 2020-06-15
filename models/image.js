const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  imageName: { 
     type: String,
     default: '',
     required:true
     },    
  imageData: { 
    type: String, 
    required:true 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

})

module.exports = mongoose.model("Image", imageSchema)