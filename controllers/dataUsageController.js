const mongoose = require('mongoose')
const Register = require('../modals/dataUsage')

exports.createDataUsage = (req, res) => {
    if (!req.body.dataPoint || !req.body.purpose) {
        res.sendStatus(400)
    } else {
        var register = new Register({
            _id: new mongoose.Types.ObjectId(),
            dataPoint: req.body.dataPoint,
            purpose: req.body.purpose,
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


