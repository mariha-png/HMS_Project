const multer = require('multer');
const path = require('path');

// --- 1. STORAGE CONFIGURATION ---
// Image kahan save hogi aur unique name kaise generate hoga
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // null ka matlab koi error nahi hai, 'uploads/' destination folder hai
        // Yaad se project root mein 'uploads' folder bana lena
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Unique suffix taake files overwrite na hon (Date + Random Number)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        // file.fieldname (e.g., 'image') + unique ID + extension
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// --- 2. FILE FILTER (Security) ---
// PDF Requirement: Sirf specific image types allow karna security ke liye
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 
    
    // Check if the uploaded file is an allowed image type
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // File accept ho gayi
    } else {
        // PDF Requirement: Error handling for invalid file types
        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
    }
};

// --- 3. INITIALIZE MULTER ---
// Storage, Filter aur 5MB Size limit (bytes mein) ke saath initialize
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit taake server heavy na ho
});

module.exports = upload;