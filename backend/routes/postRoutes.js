import express from 'express';
import * as postController from '../controllers/postController.js'
import upload from '../middlewares/uploadMiddleware.js';
import { verifyToken } from '../middlewares/verifyToken.js'; 

const router = express.Router();

//ROutes
router.get('/posts', verifyToken, postController.getAllPost);
router.get('/posts/:id', verifyToken, postController.getPostById);
router.post('/posts', verifyToken, upload.single('image'), postController.createPost);
router.put('/post/:id', verifyToken, upload.single('image'), postController.updatePost);




