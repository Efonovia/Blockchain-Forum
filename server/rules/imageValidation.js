const multer = require('multer')
const path = require('path')



// get image file
const storage = multer.diskStorage({
    destination: (req, file, call) => {
        call(null, 'uploads')
    },
    filename: (req, file, call) => {
        call(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 5000000,
        fileFilter: (req, file, call) => {
            const fileTypes = /jpeg|jpg|JPEG|JPG|PNG|png|pdf|PDF/
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



module.exports = upload