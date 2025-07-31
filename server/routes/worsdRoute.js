const express = require('express')
const router = express.Router()


const addWord = require('../lib/words/addWord')

router.post('/new-word', addWord)



module.exports = router