const express = require('express')
const router = express.Router()


const addWord = require('../lib/words/addWord')
const deleteWord = require('../lib/words/deleteWord')
const updatedWord = require('../lib/words/updateWord')

router.post('/new-word', addWord)
router.put('/edit-word', updatedWord)
router.delete('/delete-word', deleteWord)


module.exports = router