const express = require('express')
const router = express.Router()


const verifyToken = require('../lib/users/verifyToken')
const getAllLists = require('../lib/lists/getAllLists')
const getTenLists = require('../lib/lists/getTenLists')
const addList = require('../lib/lists/addList')
const getList = require('../lib/lists/getList')
const deleteList = require('../lib/lists/deleteList')

router.get('/all-lists',verifyToken, getAllLists)
router.get('/home-lists', verifyToken, getTenLists)
router.get('/list/:id', getList)
router.post('/new-list', verifyToken, addList)
router.delete('/delete-list', deleteList)



module.exports = router