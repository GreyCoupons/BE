const express = require('express')
const bodyParser = require('body-parser')
require('./motd/motd')
const PORT = 3333

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send(`yup, it's running`)
})

app.listen(PORT, () => console.log(motd(PORT)))