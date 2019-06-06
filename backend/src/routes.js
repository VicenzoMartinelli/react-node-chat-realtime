const express = require('express');
const path = require('path');
const multer = require('multer');

const routes = express.Router();

const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');
const filePath = path.resolve(__dirname, "tmp", "uploads");

routes.get('/tweets', TweetController.getAll);
routes.post('/tweets', TweetController.save);
routes.post('/tweets/file', 
    multer({storage: multer.memoryStorage()}).single("file"), 
    TweetController.saveFile);

routes.put('/clean', TweetController.delete);

routes.post('/likes/:id', LikeController.saveLike);

module.exports = routes;