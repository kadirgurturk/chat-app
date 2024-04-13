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


app.get('/api/home',authMiddleware ,(req, res) => {
    res.send('Merhaba Dünya! ' + req.user.email )
})

server.listen(PORT, () => {
    console.log(`Chat App listening on port ${PORT}`)
})