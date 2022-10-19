const mongoose= require("mongoose");
const AbenaSchema=mongoose.Schema({

    name:{
        type:String,
        require:true,
    },

    dob:{
        type:String,
        require:true,
    },

    gender:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
    },

    
    author:{
        type:String,
        require:true,
     },

     
    email:{
        type:String,
        require:true,
    },

    
    password:{
        type:String,
        require:true,
    },
})
    const form=mongoose.model("user",AbenaSchema);
    module.exports = form;