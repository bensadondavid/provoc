const express = require('express')
const router = express.Router()


const verifyToken = require('../lib/users/verifyToken')
const getAllLists = require('../lib/lists/getAllLists')
const getTenLists = require('../lib/lists/getTenLists')

router.get('/all-lists',verifyToken, getAllLists)
router.get('/home-lists', verifyToken, getTenLists)


module.exports = router