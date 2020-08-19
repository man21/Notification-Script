const mongoose = require('mongoose')

const microPolicyHistorySchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    
    microPolicyId: {
        type: String
    },

    name:{
        type: String
    },

    policyUrl:{
        type: String
    },

    createAt:{
        type: String,
    },
    updatedAt:{
        type: String
    }
},{
    collection: "thirdParty"
})

module.exports = mongoose.model("thirdParty",microPolicyHistorySchema)