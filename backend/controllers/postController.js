import Post from '..models/Post.js';


//get all posts for feed
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profileImage')
            .select('title shortDescription image CreatedAt author')
            .sort({ createdAt: -1});

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: "Can not get the post lists"})
    }
};

//get single post detail
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username profileImage')
            .populate({
                path:'conmment.userId',
                select: 'username profileImage'
            });
         if (!post) {
             return res.status(404).json({ message: " No posts matched"});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Can not get post details"});
    }
};


//create new post
export const createPost = async (req, res) => {
    try {
        const { title, content, shortDescription } = req.body;
        const image = req.file ? req.file.path : '';

        if(!title || !content || !shortDescription) {
            return res.status(400).json({
                message: "Title, content and short description are required"
            });
        }

        const newPost = new Post({
            title,
            content,
            shortDescription,
            image,
            author: req.user._id, // lấy từ middeware auth
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Can't create new post"});
    }
}

export const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, content, shortDescription } = req.body;
        const image = req.file ? req.file.path : undefined;

        const post = await Post.findById(id);

        if(!post) {
            return res.status(404).json({ message: "no post found"});
        }

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You do not have authorization to edit this post"});
        }

        const updateData = {
            title: title || post.title,
            content: content || post.content,
            shortDescription: shortDescription || post.shortDescription,
            ...(image && { image }) //Chỉ cập nhật image nếu có file mới
        };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            { new: true } //trả về document sau khi update
        );
        res.status(200).json(updatedPost);
    }catch (error) {
        res.status(500).json({ message: "Can't update this post"});
    }
};


