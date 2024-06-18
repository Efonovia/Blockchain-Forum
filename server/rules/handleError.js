const multer = require('multer')

function handleError (err, req, res, next) {
    if(err instanceof multer.MulterError) {
        return res.json({
            "success": 0,
            "error": err.message
        })
    }
}

module.exports = handleError