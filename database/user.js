const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String,
})
module.exports=mongoose.model('sparks',userSchema)