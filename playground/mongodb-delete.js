// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp',async (err,db)=>{
  if(err){
    return console.log('No fue posible conectarse a MongoDB');
  }
  console.log('Conexion exitosa a MongoDB server');

  //deleteMany
  try {
    const todoBorrados = await db.collection('Todos').deleteMany({text:'Almorzar'})
    if(todoBorrados.ok === 1){
      return console.log(todoBorrados);
    }

  } catch (e) {
    console.log("No se borro nada",e.message);
  }


  //deleteOne

  //findOneAndDelete


  //db.close()
})
