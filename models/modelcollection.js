//import mongoose in  model
const mongoose=require('mongoose')
//create model for collection
///
//schema - fields and values of collection

//users-model or collection
const users=new mongoose.model("users",{
    accNo:Number,
    uName:String,
    pwd:String,
    balance:Number,
    transactions:[]
})
//exoprt users
module.exports={users}