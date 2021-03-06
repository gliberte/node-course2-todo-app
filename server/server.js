var env = process.env.NODE_ENV

if(env === 'development'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if(env === 'test'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}

const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const {mongoose} = require('./db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./db/models/todo')
const {User} = require('./db/models/user')

const app = express()
const port = 3000;

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
app.get('/todos/:id',(req,res)=>{

    Todo.findOne({_id:req.params.id}).then((todo)=>{
      res.json({todo})
    }).catch(e=>{
      res.status(400).json({
      err:true,
      mensaje:error.message
    })
    })
    


  
})
app.delete('/todos/:id', (req,res)=>{
  const id = req.params.id
  if(!ObjectID.isValid(id)){
    return res.status(404).send()
  }
 
    Todo.findByIdAndRemove({_id:id}).then(result=>{
      if(!result){
      return res.status(404).send()
    }
      res.json(result)
    }).catch(e=>{
        res.status(400).send()
    })
    
  
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
app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password'])
  const newuser = new User(body)
  newuser.save().then(()=>{
    return newuser.generateAuthToken()
  }).then((token)=>{
    res.header('x-auth',token).send(newuser)
  }).catch(err=>{
    res.status(400).send({
      message:err.message
    })
  })

})

app.listen(port,()=>{
  console.log(`Servidor iniciado en ${port}`);
})
