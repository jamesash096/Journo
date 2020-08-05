const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    articleName: {
        type: String,
        required: [true, 'Please provide a name for the article']
    },
    upvotes: {
        type: Number
    },
    comments: [{
        userName: String,
        commentText: String
    }],
});

const Article = mongoose.model('Article', articleSchema)

module.exports = Article