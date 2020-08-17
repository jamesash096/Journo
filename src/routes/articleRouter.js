const express = require('express');
const articleController = require('./../controllers/articleController');

const router = express.Router();

router.get('/:name', articleController.getArticle);
router.post('/:name/upvote', articleController.upvotes);
router.post('/:name/add-comment', articleController.addComments);

module.exports = router;