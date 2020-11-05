const mongoose = require('mongoose')

const microPolicyHistorySchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    
    microPolicy : {
        type : String,
    },

    date:{
        type : String,
    },

    version:{
        type : String,
    },

    policyStatus:{
        type : String,
    }
})

module.exports = mongoose.model("microPolicyHistory",microPolicyHistorySchema)