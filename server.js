const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
/*
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/socialape'
*/

app.use(express.json())
app.use(morgan('dev'))

const connection = mongoose.connect(
  'mongodb://localhost:27017/socialape',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)


/*
const storage = new GridFsStorage({ 
  db: connection, 
  options: {useUnifiedTopology: true},
  file: (req, file) => {
    if (file.mimetype === 'image/jpeg') {
      return {
        bucketName: 'photos'
      };
    } else {
      return null;
    }
  } 
})
const upload = multer({ storage })

app.post("/profile", upload.single('file'), (req, res, next) => {
    console.log(req.file)

    console.log(req.body)
})


app.get("/profile/:filename", (req, res ,next) => {
  
})*/

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET })) // req.user
app.use('/api/todo', require('./routes/todoRouter.js'))
app.use("/api/comment", require("./routes/commentRouter.js"))
// app.use('/api/uploads', require('./routes/imageRouter.js'))


app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(9001, () => {
  console.log(`Server is running on local port 9001`)
})
