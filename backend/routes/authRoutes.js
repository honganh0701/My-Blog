import express from 'express';
import { register, login } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import User from '../models/User.js';

const router = express.Router();

//Register new user (Create new account)
router.post("/signup", register);

//Login user (User authentication)
router.post("/login", login);

router.get("/current-user", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;