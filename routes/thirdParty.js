const express = require('express')
const router = express.Router()
const thirdPartyController = require('../controllers/thirdPartyController')


router.post('/thirdParty',thirdPartyController.createthirdParty)

// router.put('/storeType', thirdPartyController.storeType)

// router.get('/fetchAll', thirdPartyController.fetchAll)

// router.get('/fetchById/:id', thirdPartyController.fetchById)

module.exports = router