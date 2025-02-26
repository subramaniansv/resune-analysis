const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory instead of disk

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

// Initialize Multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;
