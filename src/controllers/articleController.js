const Article = require('./../articleModel');

exports.getArticle = async (req, res) => {
    const articleName = req.params.name;
    const articleInfo = await Article.findOne({ articleName: articleName });

    res.status(200).json(articleInfo)
};

exports.upvotes = async(req, res) => {
    const articleName = req.params.name;
    const articleInfo = await Article.findOne({ articleName: articleName });

    await Article.updateOne({ articleName: articleName }, {
        '$set': {
            upvotes: articleInfo.upvotes + 1,
        }
    });

    const updatedArticleInfo = await Article.findOne({ articleName: articleName });
    res.status(200).json(updatedArticleInfo);
};

exports.addComments = async(req, res) => {
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
};