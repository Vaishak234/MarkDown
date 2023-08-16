const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile-images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/post-images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'-post')
  }
})

const upload = multer({ storage: storage })
const postUpload = multer({ storage: postStorage })

module.exports = { upload,postUpload}

