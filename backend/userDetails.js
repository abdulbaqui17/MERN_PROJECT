const mongoose=require("mongoose")
require('dotenv').config();
mongoose.connect("mongodb+srv://admin:nNBGy78jvOE02SNR@cluster0.wjlozak.mongodb.net/ideaSubmission")

const userSchema=new mongoose.Schema({
        fname:String,
        lname:String,
        email:String,
        password:String 
})

const IdeaFormSchema=new mongoose.Schema({
        ideaName:String,
        ideaDescription:String,
        studentName:String,
        studentRollNo:String,
        department:String,   
    })
const IdeaForm=mongoose.model("IdeaInfo",IdeaFormSchema)
const User=mongoose.model("UserInfo",userSchema)

module.exports={
    User,
    IdeaForm
}