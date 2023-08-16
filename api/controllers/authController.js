const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const signUp = asyncHandler(async (req, res) => {
    const {username,email,password}= req.body
    if (!username || !email || !password) return res.status(500).json('all fields required')
    const userexist = await User.findOne({email})
    if (userexist) return res.status(500).json('user with email exist')
    const hashedPassword = await bcrypt.hash(password,10)
    const createUser = await User.create({
       username,
        email,
        password:hashedPassword
    })
    if (!createUser) return res.json('cannot register please try again')
    res.status(200).json('signup successfull')
})

const login = asyncHandler(async (req, res,next) => {
    
  const { email, password } = req.body
  if (!email || !password) return res.status(500).json('all fields required')
 
  passport.authenticate("local-user", (err, user) => {
   
    if (err) {
      return res.status(500).json(err);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      user.password = null
      
      return res.status(200).json(user);
    }); 
  })(req, res, next);
})

const logout = asyncHandler(async (req, res) => {
  req.session.destroy()
  res.status(200)
        .json('logout successfull')
  
})

const googleLogin = asyncHandler(async (req, res, next) => {
  
   passport.authenticate("google-user", (err, user) => {
   
    if (err) {
      return res.redirect('http://localhost:3000/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect('http://localhost:3000/login')
      }
      user.password = null
      
      return res.redirect('http://localhost:3000/')
    }); 
  })(req, res, next);
})


module.exports = {
  signUp,
  login,
  logout,
  googleLogin
}