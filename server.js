var express = require('express')
var http = require('http');
require('dotenv').config()
var app = express();
app.use(express.json());
const PORT = process.env.PORT
const connectDb = require("./config/database")
var authMiddleware = require('./middleware/auth.middleware')

connectDb()

var server = http.createServer(app);

app.use('/api/auth', require('./router/auth.router'))

app.use(authMiddleware)

app.get('/api/home' ,(req, res) => {
    res.send('Merhaba Dünya! ' + req.user.email )
})
app.use('/api/conversation', require('./router/conversation.router'))

server.listen(PORT, () => {
    console.log(`Chat App listening on port ${PORT}`)
})