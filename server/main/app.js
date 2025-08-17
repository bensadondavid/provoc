const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const userRoute = require('../routes/userRoute')
const listsRoutes = require('../routes/listsRoutes');
const wordsRoute = require('../routes/worsdRoute')
const statsRoute = require('../routes/statsRoutes')


app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}
))

app.use(express.json())


app.use('/users', userRoute)
app.use('/lists', listsRoutes)
app.use('/words', wordsRoute)
app.use('/stats', statsRoute)



module.exports = app