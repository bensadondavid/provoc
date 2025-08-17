const express = require('express')
const router = express.Router()

const verifyToken = require('../lib/users/verifyToken')
const setStats = require('../lib/stats/setStats')

router.post('/send-stats', verifyToken, setStats)

module.exports = router