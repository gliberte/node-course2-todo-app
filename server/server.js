const express = require('express')
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./db/models/todo')
const {User} = require('./db/models/user')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
  const todo = new Todo({
    text:req.body.text
  })
  todo.save().then((doc)=>{
    res.json(doc)
  }).catch((e)=>{
    res.status(400).json({
      err:true,
      mensaje:e.message
    })
  })
})

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.json({todos})
  }).catch((e)=>{
    res.status(400).json({
      err:true,
      mensaje:e.message
    })
  })
})

app.listen(port,()=>{
  console.log(`Servidor iniciado en ${port}`);
})
