const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../model/User')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;



   
module.exports = function (passport) {
    passport.use('local-user', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({ email })  //Fetch user from database
        //check user exist or not 
        if (!user) {
            return done('No user found ', false) //if user not exist , return null user with an error message.
        } else {
            const isMatch = await bcrypt.compare(password, user.password)  //if user exist , compare password using bcryptjs library.
         
            if (isMatch) {
                
                return done(null, user)     //if password matches , return the user credentials 
            } else {
                return done('Incorrect password', false)     //if password dosenot matches , return the nul user eith an error message.
            }
        }
        
    })
    )
    
    
 passport.use('google-user',new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLECALLBACK_URL,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    
    //   const newUser = {
    //       displayname: profile.displayName,
    //       profileImg: profile.photos[0].value,
    //       email:profile.emails[0].value,
    //   }

      try {
          
          let user = await User.findOne({ email:profile.emails[0].value})
            
          if (!user) {

                return done('you need to signup first', false)    
          } else {
              done(null, user)
          }
          
      } catch (error) {
        console.log('error',error);
      }
  }
))

}


passport.serializeUser(function (user, done) {
    done(null,user._id)
})

passport.deserializeUser(async function (id, done) {
    
    let user = await User.findOne({ _id: id })
    if (user?.password) {
         user.password = ''
    }
    done(null,user)
})