const express = require('express')
const router = express.Router()

const signUp = require('../lib/users/signUp')
const login = require('../lib/users/login')


router.post('/sign-up', signUp)
router.post('/login', login)




module.exports = router