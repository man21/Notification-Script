const mongoose = require('mongoose')

const configurationSchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    
    provider : {
        type : String,
    },

    color:{
        type : Object,
    },

    position:{
        type : String,
    },

    language:{
        type : String,
    },
    scrollToConsent:{
        type : Boolean,
        default: false
    },
    customPromptText:{
        type: String
    },
    customAcceptText:{
        type: String
    },

    brandingText:{
        type: String
    },
    brandingStyle:{
        type: String
    },
    createAt:{
        type: String
    },
    updatedAt:{
        type: String
    }
},
{
    collection: "configuration"
}
)

module.exports = mongoose.model("configuration",configurationSchema)