const express=require("express");
const app=express()
const mongoose =require("mongoose")
const multer = require('multer'); 
app.use(express.json())
const cors=require("cors")
app.use(cors())
const bcrypt=require("bcryptjs")

const jwt=require("jsonwebtoken")

const JWT_SECRET="asdfsfjsklfjieowiour93sdjfkndewrfioefjds"

mongoose.connect("mongodb://localhost:27017/")

require("./userDetails")

const User=mongoose.model("UserInfo")
const Idea=mongoose.model("IdeaInfo")

app.post("/register",async function(req,res){
    const {fname,lname,email,password}=req.body
    try{
    await User.create({
        fname,
        lname,
        email,
        password
    })
    res.send({
        status:"ok"
    })
}catch(error){
    res.send({status:"error"})
}
    
})

app.post("/login-user",async (req,res)=>{
    const {email,password}=req.body
    try{
    const user=await User.findOne({email})
    if(!user){
        return res.json({error:"user not found"})
    }
    if ( await password === user.password) {
        const token=jwt.sign({},JWT_SECRET)
        // Passwords match, user is authenticated
        if(res.status(201)){
        return res.json({ message: "Login successful", data:token });
      }} else {
        // Passwords do not match
        return res.status(401).json({ error: "Invalid password" });
      }
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\Users\mohdb\OneDrive\Desktop\ideaX\backend\pdfs'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Set unique file names using current timestamp + original file name
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    xcb(null, `${uniqueSuffix}${ext}`); // Set unique file names
  },
});

const upload=multer({storage:storage})

app.post('/IdeaForm', async (req, res) => {
  const { ideaName, ideaDescription, studentName, studentRollNo, department } = req.body;
  const pdfFile = req.file ? req.file.path : null;
  try {
    // Create a new Idea document object
    const newIdea = new Idea({
      ideaName,
      ideaDescription,
      studentName,
      studentRollNo,
      department,
      pdfFile
    });

    // Save the new Idea document to the database
    await newIdea.save();
    
    console.log('Received Idea:', ideaName, ideaDescription, studentName, studentRollNo, department);
    res.status(201).json({ message: 'Idea submitted successfully' });
  } catch (error) {
    console.error('Error saving idea:', error);
    res.status(500).json({ error: 'Failed to submit idea' });
  }
});

  

app.listen(3000,function(req,res){
    console.log("server has started at port 3000")
})
