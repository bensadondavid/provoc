const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('../routes/userRoute')
const dotenv = require('dotenv').config()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}
))

app.use(express.json())


app.use('/users', userRoute)


module.exports = app