const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

router.get('/like-disLike/:id',postsController.likeAction)
router.get('/like/:id',postsController.likePost)
router.get('/is-liked/:id',postsController.isLiked)

router.get('/likes/count/:id',postsController.likesCount)
router.post('/notification/likes',postsController.addLikesNotification)
router.post('/notification/dis-likes',postsController.removeLikesotification)

router.post('/comment',postsController.commentAction)
router.get('/comment/all/:id',postsController.getComments)
router.post('/comment/delete',postsController.deleteComment)
router.post('/notification/comments', postsController.addCommentsNotification)

router.get('/notifications/get',postsController.getNotification)

module.exports = router