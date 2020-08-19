const mongoose = require('mongoose')

const microPolicySchema = mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    policyName : {
        type : String,
    },

    websiteUrl:{
        type: String
    },

    policyDescription:{
        type : String,
    },

    slug:{
        type : String,
    },

    useCookie:{
        type : Boolean,
        default : false,
    },
    essentialPolicy:{
        type : Boolean,
        default : false,
    },
    cookieWidgets:{
        type : Boolean,
        default : false,
    },




        // dataUsage:{
        //     type : array,
        //     default : []
        // },
        // thirdParty:{
        //     type : array,
        //     default : []
        // }

    
})


module.exports = mongoose.model("microPolicy",microPolicySchema)