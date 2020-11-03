// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

// IMPORTS
require('./motd/motd')
const PORT = process.env.PORT || 3333
const routes = require('./endpoints')
const {deconstruct} = require('./tools/deconstructor')
routes(app)

app.use(helmet())
app.use(cors())
app.use(express.json())

app.post('/api', deconstruct)
app.listen(PORT, () => {
    console.clear()
    console.log(motd(PORT))
})

