const Tweet = require('../models/Tweet');

let getTweets = async () => {
    return await Tweet.find({}).sort('-createdAt');
};

module.exports = {
    async getAll(req, res) {
        const tweets = await getTweets();

        return res.json(tweets);
    },

    async save(req, res) {
        const tweet = await Tweet.create(req.body);

        req.io.emit('tweet', tweet);

        return res.json(tweet);
    },
    async saveFile(req, res) {
        let tw = {};
        let { author } = req.query;
        let { file } = req;
        
        tw.author    = author;
        tw.extension = file.mimetype;
        tw.type      = 'File';
        tw.content   = file.buffer.toString('base64');

        const tweet = await Tweet.create(tw);

        req.io.emit('tweet', tweet);

        return res.json(tweet);
    },

    async delete(req, res) {
        const tweet = await Tweet.deleteMany({});
        const ts    = await getTweets();

        req.io.emit('tweetClean', ts);

        return res.json(ts);
    }
};