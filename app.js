// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()

// IMPORTS
require('./motd/motd')
const PORT = process.env.PORT || 3333

// GLOBAL MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(express.json())

// API
const coupon_routes = require('./routes/coupon_routes')
coupon_routes(app)

// SERVER MESSAGE
app.listen(PORT, () => {
    console.clear()
    console.log(motd(PORT))
})

