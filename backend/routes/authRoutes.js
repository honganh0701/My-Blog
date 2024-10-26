import express from 'express'
import { register, login } from '../controllers/authController.js'

const router = express.Router();

//Register new user (Create new account)
router.post("/signup", register);

//Login user (User authentication)
router.post("/login", login);

export default router;