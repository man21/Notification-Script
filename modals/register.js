const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    name : {
        type : String,
    },
    // fName : {
    //     type : String,
    // },
    // lName : {
    //     type : String,
    // },
    email : {
        type : String,
        required : true
    }
    
})

module.exports = mongoose.model("register",registerSchema)