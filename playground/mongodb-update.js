// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp',async (err,db)=>{
  if(err){
    return console.log('No fue posible conectarse a MongoDB');
  }
  console.log('Conexion exitosa a MongoDB server');

  //deleteMany
  try {
    const updateOne = await db.collection('Users').findOneAndUpdate(
      {_id:new ObjectID('5970c64567920dc945e66ace')},
      {$set:{name:'Luis Solano'},$inc:{age:1}},
      {returnOriginal:false}
    )
    if(updateOne){
      return console.log(updateOne);
    }
  } catch (e) {
    console.log("No se borro nada",e.message);
  }


  //deleteOne

  //findOneAndDelete


  //db.close()
})
