let express = require('express')
let bp = require('body-parser')
let cors = require('cors')
let server = express()
let PORT = process.env.PORT || 3000
require('./assets/db/db-config')

server.use(express.static(__dirname + '../../client/dist'))

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

let whitelist = ['http://localhost:8080', 'https://wifles.herokuapp.com/']
let corsOptions = {
    origin: function (origin, callback) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
}
server.use(cors(corsOptions))

let wiffles = require('./assets/routes/wiffles')
server.use('/api/wiffles', wiffles)
let comments = require('./assets/routes/comments')
server.use('/api/comments', comments)

server.use('*', (err, req, res, next) => {
  res.status(err.status || 400).send(err)
})

server.listen(PORT, () => console.log('port is running on', PORT))