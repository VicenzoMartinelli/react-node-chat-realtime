const Tweet = require('../models/Tweet');

module.exports = {
    async saveLike(req, res) {
        const tweet = await Tweet.findById(req.params.id);
        
        tweet.likes++;

        await tweet.save();

        req.io.emit('like', tweet);

        return res.json(tweet);
    }
};
