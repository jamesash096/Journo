const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const articleRouter = require('./routes/articleRouter')

const app = express();

app.use(express.static(path.join(__dirname,'/build')))
app.use(bodyParser.json());

app.use('/api/articles', articleRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;