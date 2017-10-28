const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 3000

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

const pumpkinRouter = require('./src/routes/pumpkins')

app.use('/davidspumpkins', pumpkinRouter)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
