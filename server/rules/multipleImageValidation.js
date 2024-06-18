const multer = require('multer')
const path = require('path')

// get image file
 
const storage = multer.diskStorage({
  destination: (req, file, call) => {
    call(null, 'uploads/experttips')
  },
  filename: (req, file, call) => {
    const fieldName = file.fieldname === 'home_img' ? 'home' : 'away'
    const fileName = fieldName + '_' + Date.now() + path.extname(file.originalname)
    call(null, fileName)
  },
})


const uploads = multer({
  storage,
  limits: {
    fileSize: 5000000,
    fileFilter: (req, file, call) => {
      const fileTypes = /jpeg|jpg|JPEG|JPG|PNG|png/
      const minType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (minType && extname) {
        return call(null, true)
      } else {
        return call('The image format type is not allowed')
      }
    },
  },
}).fields([
  {
    name: 'home_img',
    maxCount: 1,
  },
  {
    name: 'away_img',
    maxCount: 1,
  },
])

module.exports = uploads