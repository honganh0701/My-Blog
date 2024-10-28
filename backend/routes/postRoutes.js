import express from 'express';
import { createPost, getPosts, getPost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Cấu hình multer cho upload ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // giới hạn 5MB
    }
});

router.post('/', verifyToken, upload.single('image'), createPost);
router.get('/', verifyToken, getPosts);
router.get('/:id', verifyToken, getPost);

export default router;