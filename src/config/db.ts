import mongoose from "mongoose";



export const connectDB = async () => {

    try{

        
        const {connection} = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'semillero'
        });
        const url = `${connection.host}:${connection.port}`;

        console.log(`mongoDB conectado al puerto: ${url}` );

    }catch (error){
        console.log('Error al conectar a MongoDB:', error);
    }
}