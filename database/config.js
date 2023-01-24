const mongoose = require('mongoose');


const dbConnection= async () => {

    try{

       await  mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, Comentado ya que 
        //ya no son opciones compatibles. Mongoose 6 siempre se 
        //comporta como si useNewUrlParser, useUnifiedTopology y 
        //useCreateIndex fueran verdaderos y useFindAndModify fuera falso.
        // useFindAndModify: false
       });
       console.log('Base de datos online');
    }catch(error){
        console.log(error);
        throw new error('Error a la hora de iniciar la base de datos');
    }
}

module.exports={
    dbConnection
}
