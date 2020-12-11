// DEPENDENCIES
const { add_flags } = require("./middleware")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const app = express()

// IMPORTS
require("./motd/motd")
const PORT = process.env.PORT || 3333

// GLOBAL MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(add_flags)

// API
const routes = require("./routes")
routes(app)

// SERVER MESSAGE
app.listen(PORT, () => {
	console.clear()
	console.log(motd(PORT))
})
