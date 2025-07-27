const express = require('express')
const router = express.Router()


const getAllLists = require('../lib/lists/getAllLists')
const verifyToken = require('../lib/users/verifyToken')

router.get('/all-lists',verifyToken, getAllLists)


module.exports = router