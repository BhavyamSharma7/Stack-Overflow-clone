import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const isPost = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(isPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addPost = async (req, res) => {
  const newPost = new Post({ ...req.body, userId: req.userId });
  try {
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, savedPost });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const isPost = await Post.findById(req.params.id);
    if (!isPost) res.status(500).json("Post not found!");

    if (req.userId === isPost.userId) {
      isPost.delete(req.params.id);
      res.status(200).json({ success: true, message: "Post deleted." });
    } else {
      res.json("You can't delete other's post.");
    }
  } catch (error) {
    res.status(500).json("something wrong...");
  }
};

export const like = async (req, res) => {
  try {
    const isPost = await Post.findById(req.params.id);
    if (!isPost) res.status(500).json("Post not found!");

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.userId },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const dislike = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.userId },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const commentPost = async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          comments: { userId: req.userId, comment },
        },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
