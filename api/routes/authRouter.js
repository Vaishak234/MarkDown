const express = require('express')
const router = express.Router()
const {signUp,login, logout, googleLogin} = require('../controllers/authController')
const passport = require('passport')

router.post('/signup',signUp)
router.post('/login',login)
router.post('/logout',logout)
router.get('/google', passport.authenticate('google-user', { scope: ['profile', 'email'] }))
router.get('/google/callback', googleLogin)

router.get('/getuser', (req, res) => {
    if (!req.user) return res.status(500).json('no user loggedin')
    res.status(200).json(req.user)
})

router.get('/google/success', (req, res) => {
    if (!req.user) return res.status(500).json('no user loggedin')
    res.status(200).json(req.user)
})

module.exports = router