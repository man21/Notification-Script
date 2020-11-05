const mongoose = require('mongoose')
const Register = require('../modals/thirdParty')

exports.createthirdParty = (req, res) => {
    if (!req.body.name || !req.body.policyUrl) {
        res.sendStatus(400)
    } else {
        var register = new Register({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            policyUrl: req.body.policyUrl,
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


