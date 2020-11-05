const mongoose = require('mongoose')
const Register = require('../modals/configuration')

exports.createConfiguration = (req, res) => {
    if (!req.body.position || !req.body.language) {
        res.sendStatus(400)
    } else {
        var register = new Register({
            _id: new mongoose.Types.ObjectId(),
            color: req.body.color,
            position: req.body.position,
            language: req.body.language,
            scrollToConsent: req.body.scrollToConsent,
            customPromptText: req.body.customPromptText,
            customAcceptText: req.body.customAcceptText,
            brandingText: req.body.brandingText,
            brandingStyle: req.body.brandingStyle,
            createdAt: new Date(),
            updatedAt: new Date(),

        });

        register.save().then(function (result) {
            if (!result) {
                throw "RECORD NOT SAVED"
            } else {
                res.status(200).send({msz : 'THANK YOU FOR GIVING YOUR PRECIOUS FEEDBACK'})
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}

exports.fetchAll = (req, res) =>{

    Register.find().exec().then((result) =>{
        res.send(result)
    })
}


exports.fetchById = (req, res) =>{

    Register.find({_id: req.params.id}).exec().then((result) =>{
        res.send(result)
    })
}


