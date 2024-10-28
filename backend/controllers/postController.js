import Post from "../models/Post.js";

// Create new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = "";

        // Xử lý file ảnh nếu có
        if (req.file) {
            // Chỉ lưu tên file và thư mục, không lưu đường dẫn đầy đủ
            imageUrl = 'uploads/' + req.file.filename; // Thay vì req.file.path
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

// Update post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json("Post not found");
        }

        // Kiểm tra quyền sở hữu
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json("You can only update your own posts");
        }

        const { title, content } = req.body;
        let imageUrl = post.image; // Giữ nguyên ảnh cũ nếu không upload ảnh mới

        if (req.file) {
            imageUrl = 'uploads/' + req.file.filename;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                image: imageUrl
            },
            { new: true }
        ).populate('userId', 'username');

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add comment
export const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json("Post not found");
        }

        const { content } = req.body;
        
        post.comments.push({
            userId: req.user.id,
            content
        });

        await post.save();

        // Populate the new comment's user information
        const updatedPost = await Post.findById(req.params.id)
            .populate('userId', 'username')
            .populate('comments.userId', 'username');

        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};
