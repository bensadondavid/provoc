const express = require('express')
const router = express.Router()

const verifyToken = require('../lib/users/verifyToken')
const setStats = require('../lib/stats/setStats')
const getLastSession = require('../lib/stats/getLastSessions')

router.get('/get-lasts-sessions', verifyToken, getLastSession)
router.post('/send-stats', verifyToken, setStats)

module.exports = router