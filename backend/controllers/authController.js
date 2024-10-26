import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

//controller xử lý đăng ký
export const register = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(400).json("The email have already been used");
        }

        //mã hóa password trước khi lưu vào db
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //taọ user mới với password đã mã hóa
        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        });

        //lưu user vào database
        const savedUser = await newUser.save();

        const { password: _, ...userInfo} = savedUser._doc;
        res.status(201).json(userInfo);
    } catch (err) {
        res.status(500).json(err);
    }
};

//controllr xử lý đăng nhập
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        //tìm user theo email
        const user = await User.findOne ( { email});
        if (!user) {
            return res.status(404).json("User does not exist");
        }

        //comparing password the user just sent and the encrypted password saved in DB
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return res.status(400).json("Wrong Password");
        }

        //Create JWT token
        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "3d"} //token will expire in 3 days
        );

        const { password:_, ...userInfo} =user._doc;
        res.status(200).json({ ...userInfo, token});
        
    } catch (err){
        res.status(500).json(err);
    }
};

