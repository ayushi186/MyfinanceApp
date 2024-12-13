import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionModel = new Schema({
    username: {
       type: String,
       required:true,
       unique: true,
    },
    avatar: {
       type: String,
       required:false,
       default:""
      
    },
    name: {
       type: String,
       required:true,
    },
      date:{
       type: String,
       required: true,
       default: new Date().toLocaleString("yyyy-mm-ssThh:mm:ss.FFFZ")
       
      },
      amount:{
       type: Number,
       required: true,
      },
      recurring :{
        type: Boolean,
        required: true,
        default: false,

      } 
    }
)

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionModel)

export default Transaction;

