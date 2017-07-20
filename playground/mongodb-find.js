// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp',async (err,db)=>{
  if(err){
    return console.log('No fue posible conectarse a MongoDB');
  }
  console.log('Conexion exitosa a MongoDB server');



  try {
    const todos = await db.collection('Todos').find().count()

      console.log(todos);

  } catch (e) {
    console.log('No fue posible extraer los registros',e.message);
  }

  //db.close()
})
