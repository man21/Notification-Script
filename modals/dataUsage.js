const mongoose = require('mongoose')

const microPolicyHistorySchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    
    microPolicyId: {
        type: String
    },

    dataPoint:{
        type: String
    },

    purpose:{
        type: String
    },

    createAt:{
        type: String,
    },
    updatedAt:{
        type: String
    }


},{
    collection: "dataUsage"
})

module.exports = mongoose.model("dataUsage",microPolicyHistorySchema)