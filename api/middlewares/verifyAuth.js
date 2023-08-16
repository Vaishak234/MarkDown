

module.exports = verifyAuth = (req,res,next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json('not authenticated')
    }
}