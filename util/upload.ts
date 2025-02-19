import multer from "multer";

import fs from "fs";
import path from "path";

// Define the uploads directory
const UPLOADS_DIR = path.join(__dirname, "../uploads");

// Ensure the directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure 'uploads/' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize multer middleware
const upload = multer({ storage });

export default upload;
