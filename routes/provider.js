const express = require('express')
const router = express.Router()
const registerController = require('../controllers/provider')


router.post('/provider',registerController.searchDomain)

router.put('/storeType', registerController.storeType)


router.get('/fetchAll', registerController.fetchAll)

router.get('/fetchById/:id', registerController.fetchById)

router.get('/fetchByWebsiteUrl', registerController.fetchByWebsite)

module.exports = router