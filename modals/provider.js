const mongoose = require('mongoose')

const microPolicyHistorySchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    
    microPolicyId: {
        type: String
    },

    name:{
        type: String
    },

    websiteUrl:{
        type: String
    },

    type:{
        type: String
    },

    provider:{
        type: String
    },

    createAt:{
        type: String,
    },
    updatedAt:{
        type: String
    }
},{
    collection: "provider"
})

module.exports = mongoose.model("Provider",microPolicyHistorySchema)