import mongoose from "mongoose";

const Schema = mongoose.Schema;

const budgetModel = new Schema({
    
    category: {
      type: String,
      required: true,
      unique: true,
    },
    maximum: {
       type: Number,
       required:true,
       
      
    },
    theme: {
       type: String,
       required:true,
    },
    username: {
      type: String,
      required:true,
      
   },
     
    }
)

const Budget = mongoose.models.Budgetnew || mongoose.model("Budgetnew", budgetModel)

export default Budget;

