const express = require('express')
const router = express.Router()


const addWord = require('../lib/words/addWord')
const deleteWord = require('../lib/words/deleteWord')

router.post('/new-word', addWord)
router.delete('/delete-word', deleteWord)


module.exports = router