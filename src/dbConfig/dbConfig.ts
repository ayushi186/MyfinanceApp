import mongoose from "mongoose";

export async function connect() {
    try{ mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected' , () =>{
            debugger
            console.log('MOngoDB connected successfully')
        })
        connection.on('error' , () =>{
            console.log('MOngoDB connectio erorr')
        })
    }
    catch(error){
       console.log(error)
    }
}