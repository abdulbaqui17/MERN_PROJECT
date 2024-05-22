const mongoose=require("mongoose")

const UserDetails=new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:String,
        password:String 
    },
    {
        collection:"UserInfo"
    }
)

const IdeaForm=new mongoose.Schema(
    {
        ideaName:String,
        ideaDescription:String,
        studentName:String,
        studentRollNo:String,
        department:String,
        pdfFile:{type:String}
    },
    {
        collection:"IdeaInfo"
    }
)
mongoose.model("IdeaInfo",IdeaForm)
mongoose.model("UserInfo",UserDetails)