
const express = require("express");
const mongoose = require("mongoose");
const User = require("./Schema/schema");
const bcrypt = require("bcrypt");

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname));




mongoose.connect("mongodb+srv://data:data123@cluster1.ragoek9.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then((request, respond) => {
        console.log("Database connected")
    }).catch((error) => {
        console.log(error)
    })


    app.get("/users", async(req, res) => {
        const users = await User.find()
        console.log(users)
    })
    
    app.get("/about", (request, response) => {
        response.send("you can email me at rashida@gmail.com")
    })

//password encryption
app.post("/addData", async (request, respond) => {
    try {
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(request.body.password, salt)
        console.log(password)

        const { name, dob, gender, description, author, email } = request.body;
        const form = await User.create({ name, dob, gender, description, author, email, password })

        if (form) {
            respond.status(200).json({
                status: true,
                message: "welcome home Ama",
                data: form
            })
        } else {
            respond.status(400).json({
                status: false,
                message: "you are not welcome home",
            })

        }


    } catch (error) {
        console.log(error)
    }
})

app.get("/",(request,response)=>{
    response.sendFile(__dirname +"/index.html");
});


// login authentication
app.post("/login",(request,respond)=>{
    const email=request.body.email;
    const password=request.body.password;
 user.findOne({email}).then((user)=>{

    //check if email is invalid 
    if (!user) return respond.status(400).json({message:"invalid email"});

    // if email is valid then check for the password and 
    // Using the bcrypt compare or authenticate the users credentials
  
    bcrypt.compare(password,user.password,(err,data)=>{
        if (err) return err;

        if (data){
            respond.status(200).json({message:"Welcome back"});
        }else{
            respond.status(400).json({message:"Invalid message"})
        }
    })   
 })   
})






app.listen(5000, () => {
    console.log("server connected")
})

