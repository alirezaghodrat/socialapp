// const express = require("express");
// const imageRouter = express.Router();
// const Image = require('../models/image.js')
// const multer =require("multer")


// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//       cb(null ,'/uploads')
//     },
//     filename: function (req,file,cb){
//       cb(null, Date.now() + file.originalname)
//     }
// })

// const fileFilter = (req,file,cb) =>{
//     if( file.mimeType ==='image/jpeg' || file.mimeType === 'image/png'){
//           cb(null,true)
//     }else{
//           cb(null,false)
//     }

// const upload= multer({
//       storage:storage,
//       limits:{
//         fileSize: 1024*1024*5
//       },
//       fileFilter:fileFilter
// })

//  imageRouter.route("/uploadmulter")
//      .post(upload.single('imageData'),(req,res,next)=>{
//       console.log(req.body)
//       const newImage =new Image({
//       imageName:req.body.imageName,
//       imageData: req.file.path
//   })

//   newImage.save()
//   .then((result) =>{
//     console.log(result)
//     res.status(200).json({
//       success:true,
//       document: result
//     })
//   })
//   .catch((err) => next(err))
// })

// module.exports = imageRouter
