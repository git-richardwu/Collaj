require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const artRoutes =  require('./routers/art')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/art', artRoutes)

mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => {
        app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
    })
        })
        .catch((error) => {
            console.log(error)
        })
