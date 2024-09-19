
const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
 name: {
   type: String,
 },
 email: {
   type: String,
 },
 phone:{
   type:Number
 },
 password: {
   type: String,
 },
 isBlocked:{
   type:Boolean,
   default:false,
  },
  language:{
    type:String,

  },
   rating:{
     type:String
   }
})

      const User=mongoose.model("User",UserSchema)

      module.exports=User