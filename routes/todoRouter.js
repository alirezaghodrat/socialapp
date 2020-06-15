const express = require("express")
const todoRouter = express.Router()
const Todo = require('../models/todo.js')
const User = require("../models/user.js")

// Get All Todos
todoRouter.get("/", (req, res, next) => {
  Todo.find((err, todos) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(todos)
  })
})

// Get todos by user id
todoRouter.get("/user/:userID", (req, res, next) => {
  Todo.find({ user: req.params.userID }, (err, todos) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(todos)
  })
})


//get todo by search term
todoRouter.get("/search", (req, res, next) => {
  const {todo} = req.query
  const pattern = new RegExp(todo)
  Todo.find({ title: { $regex:pattern , $options: 'i'}},
  (err, todos) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(todos)
  })
})

// Get issue and its comments by _id
  todoRouter.get("/:todoId" ,async (req, res, next) => {
    try {
      const todo = await Todo.findOne({ _id: req.params.todoId });
      const comments = await Comment.find({ todo: todo._id });
      return res.status(200).send({...todo.toObject(), comments});
    } catch (err) {
      res.status(500);
      return next(err);
    }
  })

// Add new Todo
todoRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  User.findOne({_id: req.user._id},(err, user) => {
      if(err){
        res.status(500)
        return next(err)
      }
      req.body.username = user.username
      const newTodo = new Todo(req.body)
      newTodo.save((err, savedTodo) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(savedTodo)
      })
  })
  
})


// Delete Todo
todoRouter.delete("/:todoId", (req, res, next) => {
  Todo.findOneAndDelete(
    { _id: req.params.todoId, user: req.user._id },
    (err, deletedTodo) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete todo: ${deletedTodo.title}`)
    }
  )
})

// Update Todo
todoRouter.put("/:todoId",  (req, res, next) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedTodo) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedTodo)
    }
  )
})

// vote the president

  // check whether the person voting has already voted on this issue, and deny them
  // Either upvote/downvote issue.
todoRouter.put("/upvote/:todoId", async (req, res, next) =>{
  try {
    // Has this user already voted
    const todoToUpdate = await Todo.findOne({_id: req.params.todoId})
   
    if(todoToUpdate.usersWhoHaveVoted.includes(req.user._id)){
      res.status(401)
      return next(new Error("You can only vote once per issue."))
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoId },
      { 
        $inc: {vote: 1},
        $push: { usersWhoHaveVoted: req.user._id}
      },
      {new: true}
    )
    
    return res.status(201).send(updatedTodo)
  }
  catch(err){
    res.status(500)
    return next(err)
  }
})

todoRouter.put("/downvote/:todoId", async (req, res, next) =>{
 
  try {
    // Has this user already voted
    const todoToUpdate = await Todo.findOne({_id: req.params.todoId})
   
    if(todoToUpdate.usersWhoHaveVoted.includes(req.user._id)){
      res.status(401)
      return next(new Error("You can only vote once per issue."))
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoId },
      { 
        $inc: {vote: -1},
        $push: { usersWhoHaveVoted: req.user._id}
      },
      {new: true}
    )
    
    return res.status(201).send(updatedTodo)
  }
  catch(err){
    res.status(500)
    return next(err)
  }

})

module.exports = todoRouter

////////////////////////////////////////
// upload img 
// todoRouter.post("/", (req, res, next) => {
//     var newItem = new Item();
//  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newItem.img.contentType = "image/png";
//  newItem.save();
// })
/////////////////////////////////////////////
//upload img 2
// todoRouter.post("/", (req, res, next) => {
//     const BusBooy = require('busboy');
//     const path = require("path");
//     const os = require("os");
//     const fs = require("fs")

//     const busboy = new BusBooy({ headers : req.headers })
      
//     let imageFileName;
//     let imageToBeUploaded ={}

//     busboy.on('file',(fieldname,file,filename,encoding,mimtype)=>{
//         console.log(fieldname)
//         console.log(filename)
//         console.log(mimetype)
//         // my.image.png
//         const imageExtension = filename.split('.')[filename.split('.').length-1]
//         //476756387563445378.png
//         ImageFileName = `${Math.round(Math.random()*1000000000000)}.${imageExtension}`
//         const filepath = path.join(os.tmpdir(),imageFileName)
//         imageToBeUploaded ={ filepath,mimtype}
//         file.pipe(fs.createWriteStream())
//     })
//     busboy.on('finish',()=>{
//         admin.storage().bucket().upload(imageToBeUploaded.filepath, {
//             resumable: false,
//             metadata:{
//                 metadata:{
//                 contentType: imageToBeUploaded.mimetype
//             }
//         }
//         })
//         .then(()=> {
//             const imageUrl =`https://fi `
//         })
//     })
// })
//////////////////////////////////////////////////////////
//reduce user detail
// todoRouter.get("/", (req, res, next) => {
//     let userDetail={};

//     if(!isEmpty(data.bio.trim())) userDetail.bio = data.bio
//     if(!isEmpty(data.bio.trim())){
//         //https://website.com
//         if(data.website.trim().substring(0,4) !== 'http'){
//             userDetail.website=`http://${data.website.trim()}`
//         }else userDetail.website = data.website
//     }
//     if(!isEmpty(data.location.trim())) userDetail.location = data.location
//     return userDetail
// })


