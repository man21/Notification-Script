const mongoose = require('mongoose')
const Register = require('../modals/register')

exports.register = (req, res) => {
    if (!req.body.name || !req.body.email) {
        res.sendStatus(400)
    } else {
        var register = new Register({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            fName: req.body.fName,
            lName: req.body.lName,

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

