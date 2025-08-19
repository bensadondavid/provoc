const express = require('express')
const router = express.Router()

const verifyToken = require('../lib/users/verifyToken')
const setStats = require('../lib/stats/setStats')
const getLastSession = require('../lib/stats/getLastSessions')
const globalStats = require('../lib/stats/globalStats')

router.get('/get-lasts-sessions', verifyToken, getLastSession)
router.get('/global-stats', verifyToken, globalStats)
router.post('/send-stats', verifyToken, setStats)

module.exports = router