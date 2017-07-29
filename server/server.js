const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {ObjectID} = require('mongodb')
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
app.get('/todos/:id',async (req,res)=>{
  try {
    const todo = await Todo.findOne({_id:req.params.id})
    res.json({todo})
  } catch (error) {
    res.status(400).json({
      err:true,
      mensaje:error.message
    })
  }
  
})
app.delete('/todos/:id', async (req,res)=>{
  const id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  try {
    const result = await Todo.findByIdAndRemove({_id:id})
    if(!result){
      return res.status(404).send()
    }
    res.json(result)
    
  } catch (error) {
    res.status(400).send()
  }
  
})

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed'])
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
  }else{
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id,{$set:body},{
    new:true
  }).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo})
  }).catch(e =>{
    res.status(400).send()
  })
})

app.listen(port,()=>{
  console.log(`Servidor iniciado en ${port}`);
})
