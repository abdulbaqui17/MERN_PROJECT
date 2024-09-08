const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/")

const User=new mongoose.Schema({
        fname:String,
        lname:String,
        email:String,
        password:String 
})

const IdeaForm=new mongoose.Schema({
        ideaName:String,
        ideaDescription:String,
        studentName:String,
        studentRollNo:String,
        department:String,   
    })
mongoose.model("IdeaInfo",IdeaForm)
mongoose.model("UserInfo",User)

module.exports={
    User,
    IdeaForm
}