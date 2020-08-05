const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: './config.env' })

const mongoose = require('mongoose');
const Article = require('./articleModel')

const app = express();

app.use(express.static(path.join(__dirname,'/build')))
app.use(bodyParser.json());

const DB = process.env.DATABASE.replace('*****', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('DB Connection established!'))
const port = process.env.PORT || 3000;

app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;
    const articleInfo = await Article.findOne({ articleName: articleName });

    res.status(200).json(articleInfo)
});

app.post('/api/articles/:name/upvote', async(req, res) => {
    const articleName = req.params.name;
    const articleInfo = await Article.findOne({ articleName: articleName });

    await Article.updateOne({ articleName: articleName }, {
        '$set': {
            upvotes: articleInfo.upvotes + 1,
        }
    });

    const updatedArticleInfo = await Article.findOne({ articleName: articleName });
    res.status(200).json(updatedArticleInfo);
})

app.post('/api/articles/:name/add-comment', async(req, res) => {
    const { userName, commentText } = req.body;
    const articleName = req.params.name;

    const articleInfo = await Article.findOne({ articleName: articleName });
    await Article.findOneAndUpdate({ articleName: articleName }, {
        '$set': {
            comments: articleInfo.comments.concat({ userName, commentText }),
        },
    });
    const updatedArticleInfo = await Article.findOne({ articleName: articleName });

    res.status(200).json(updatedArticleInfo)
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`)
});

