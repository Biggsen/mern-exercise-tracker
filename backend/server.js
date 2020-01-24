// required modules
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

// setup app and port
const app = express()
const port = process.env.PORT || 5000

// express middleware
app.use(cors())
app.use(express.json())

// connect to db
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection successful')
})

// routes
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})