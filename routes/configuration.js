const express = require('express')
const router = express.Router()
const registerController = require('../controllers/configuration')


router.post('/configuration',registerController.createConfiguration)

router.get('/fetchAll', registerController.fetchAll)

router.get('/fetchById/:id', registerController.fetchById)


module.exports = router