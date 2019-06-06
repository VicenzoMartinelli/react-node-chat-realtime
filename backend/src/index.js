const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

//mongoose.connect('mongodb://goweek:goweek123@ds123635.mlab.com:23635/goweek-vicenzo', {
mongoose.connect('mongodb://goweek:goweek123@192.168.99.100:27017/goweek-vicenzo', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('server starter on port 3000');
});