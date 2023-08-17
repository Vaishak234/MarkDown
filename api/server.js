const express = require('express');
const path = require('path');
const logger = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors')
const passport = require('passport');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectMongoDB = require('./database/connection')
const authRouter = require('./routes/authRouter');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/userRouter');
const postsRouter = require('./routes/postsRouter');
const errorHandler = require('./middlewares/errorHandler');
const store = require('./database/sessionStore');

dotenv.config()
require('./config/passport')(passport)

const app = express();
const port = process.env.PORT || 4000

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized:true,
   store: store,
   cookie: {
      maxAge:24*60 *60*1000*7
   }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
   console.log('user : ',req.user);
   next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use("*",cors({origin:true,credentials:true}))
app.use(cookieParser())
app.use(errorHandler)


connectMongoDB()

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/messages', messageRouter);
app.use('/api/posts', postsRouter);

app.listen(port, () => {
   console.log('server is running on port ',port);
})

