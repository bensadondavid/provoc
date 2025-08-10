const express = require('express')
const router = express.Router()

const signUp = require('../lib/users/signUp')
const login = require('../lib/users/login')
const logOut = require('../lib/users/LogOut')
const protected = require('../lib/users/protected')
const  verifyToken = require('../lib/users/verifyToken')
const resetPassword = require('../lib/users/resetPassword')

router.post('/sign-up', signUp)
router.post('/login', login)
router.post('/logout', logOut)
router.get('/protected', verifyToken, protected )
router.post('/forgot-password', resetPassword)


module.exports = router