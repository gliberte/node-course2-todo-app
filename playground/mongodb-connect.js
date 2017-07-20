// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('No fue posible conectarse a MongoDB');
  }
  console.log('Conexion exitosa a MongoDB server');

  // db.collection('Todos').insertOne({
  //   text:"Algo que hacer",
  //   completed:false
  // },(err,result)=>{
  //   if(err){
  //     return console.log('No se pudo crear el registro',err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //
  // })
  // db.collection('Users').insertOne({
  //   name:"Luis",
  //   age:45,
  //   location:"Panama"
  // },(err,result)=>{
  //   if(err){
  //     return console.log('No se pudo crear el nuevo usuario',err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  //
  // })
  db.close()
})
