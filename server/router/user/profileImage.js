const multer = require('multer')
const path = require('path')


  

// get image file
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/profileimage')
    },

    filename: (req, file, callback) => {
      const {username} = req.params;
      const extension = path.extname(file.originalname);
      callback(null, username + extension);
    }
 
  });

const uploaded = multer({
    storage,
    limits: {
        fileSize: 5000000,
        fileFilter: (req, file, call) => {
            const fileTypes = /jpeg|jpg|JPEG|JPG|PNG|png/
            const minType = fileTypes.test(file.mimetype)  
            const extname = fileTypes.test(path.extname(file.originalname))



            if(minType && extname){
                return call(null, true)
            } else {
                return call("The image format type is not allowed")
            }
        }
    }
}).single('image')



module.exports = uploaded