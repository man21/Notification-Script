const express = require('express')
const router = express.Router()
const registerController = require('../controllers/dataUsageController')


router.post('/dataUsage',registerController.createDataUsage)

// router.put('/storeType', registerController.storeType)


router.get('/fetchAll', registerController.fetchAll)

router.get('/fetchById/:id', registerController.fetchById)



module.exports = router