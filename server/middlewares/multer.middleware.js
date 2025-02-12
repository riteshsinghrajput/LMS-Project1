import path from "path";

import multer from "multer";

const upload = multer({
    dest: "uploads/",
    // limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
    storage: multer.diskStorage({
        destination: "uploads/",
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (_req, file, cb) => {
        let ext = path.extname(file.originalname);

        if (
            ext !== ".jpg" &&
            ext !== ".JPG" &&
            ext !== ".jpeg" &&
            ext !== ".JPEG" &&
            ext !== ".webp" &&
            ext !== ".WEBP" &&
            ext !== ".png" &&
            ext !== '.PNG' &&
            ext !== ".mp4" &&
            ext !== '.MP4'
        ) {
            cb(new Error(`Unsupported file type! ${ext}`), false);
            return;
        }

        cb(null, true);
    },
});

export default upload;
