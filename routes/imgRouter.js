const express = require('express');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const imgRouter = express.Router()
const url = 'mongodb://localhost:27017/socialape'

const storage = new GridFsStorage({ db: url })

const upload = multer({ storage })

app.post("/", upload.single('file'), (req, res, next) => {
    console.log(req.file)
    console.log(req.body)
})

module.exports = imgRouter