import Post from "../models/Post.js";

// Create new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = "";

        // Xử lý file ảnh nếu có
        if (req.file) {
            imageUrl = req.file.path; // Giả sử đã setup multer middleware
        }

        const newPost = new Post({
            userId: req.user.id, // Lấy từ middleware auth
            title,
            content,
            image: imageUrl
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('userId', 'username')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('userId', 'username')
            .populate('comments.userId', 'username');
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};