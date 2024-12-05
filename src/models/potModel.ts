import mongoose from "mongoose";



const Schema = mongoose.Schema;

export const PotModel = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    total:{
        type: Number
    },
    target:{
        type: Number,
        required: true,
    },
    theme:{
        type: String,
        required: true,
    
    },
    username:{
        type: String,
        required: true

    }
})


const Pots = mongoose.models.Pots || mongoose.model("Pots", PotModel)

export default Pots;

