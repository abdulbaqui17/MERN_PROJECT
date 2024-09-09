const express=require("express");
const app=express() 
const cors=require("cors")
require('dotenv').config();
const z=require("zod")
const {User,IdeaForm}=require("./userDetails")

app.use(cors({
  origin: "https://mern-project-tau-six.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  
}));
app.options('*', cors()); // Enable preflight across all routes

app.use(express.json())


const signSchema=z.object({
  fname:z.string(),
  lname:z.string(),
  email:z.string().email(),
  password:z.string()
})

app.get("/",(req,res)=>{
  res.json({
    msg:"hello"
  })
})

app.post("/register",async function(req,res){
    const {success}=signSchema.safeParse(req.body)
    if(!success){
      return res.json({
        msg:"invalid inputs"
      })
    }
    const {fname,lname,email,password}=req.body
    try{
   
    const user=await User.create({
        fname,
        lname,
        email,
        password
    })
    if(!user){
      return res.json({msg:"user not created"})
    }
    res.send({
        status:"ok"
    })
}catch(error){
    res.send({status:"error"+error})
}
    
})

app.post("/login-user",async (req,res)=>{
    try{
      const user=await User.findOne(req.body)
      if(!user){
          return res.json({error:"user not found"})
      }
      return res.json({ message: "Login successful"});
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/IdeaForm', async (req, res) => {
  const { ideaName, ideaDescription, studentName, studentRollNo, department } = req.body;
 
  try {
    const newIdea =await IdeaForm.create({
      ideaName,
      ideaDescription,
      studentName,
      studentRollNo,
      department
    });
    if(!newIdea){
      return res.json({msg:"error"})
    }
    res.status(201).json({ message: 'Idea submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit idea' });
  }
});

module.exports=app
