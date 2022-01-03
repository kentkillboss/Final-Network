const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/useModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  videoPaginating() {
    const rpPage = this.queryString.rpPage * 1 || 1;
    const limit = this.queryString.limit * 1 || 30;
    const skip = (rpPage - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please add your photo." });

      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });
      await newPost.save();
      res.json({
        msg: "Đã tạo bài viết",
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({
          user: [...req.user.following, req.user._id],
        }),
        req.query
      ).paginating();
      const posts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          images,
        }
      )
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Đã cập nhập bài viết!",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: "Bạn đã thích bài viết này." });

      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });

      res.json({ msg: "Đã thích bài viết!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });

      res.json({ msg: "Đã huỷ thích bài viết!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUserPost: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({ user: req.params.id }),
        req.query
      ).paginating();
      const posts = await features.query.sort("-createdAt");
      res.json({ posts, result: posts.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });
      if (!post)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });
      res.json({ post });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPostDiscover: async (req, res) => {
    try {
      // const features = new APIfeature(
      //   Posts.find({
      //     user: { $nin: [...req.user.following, req.user._id] },
      //   }),
      //   req.query
      // ).paginating();
      // const posts = await features.query.sort("-createdAt");

      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 9;

      const posts = await Posts.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      await Comments.deleteMany({ _id: { $in: post.comments } });

      res.json({
        msg: "Đã xoá bài viết.",
        newPost: {
          ...post,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0)
        return res.status(400).json({ msg: "Đã lưu bài viết." });

      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });

      res.json({ msg: "Đã lưu bài viết!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unSavePost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });

      res.json({ msg: "Đã huỷ lưu bài viết!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Posts.find({
          _id: { $in: req.user.saved },
        }),
        req.query
      ).paginating();

      const savePosts = await features.query.sort("-createdAt");

      res.json({
        savePosts,
        result: savePosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  reportPost: async (req, res) => {
    try {
      const post = await Posts.find({
        _id: req.params.id,
        report: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: "Bạn đã báo cáo bài viết này." });

      const report = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { report: req.user._id },
        },
        { new: true }
      );

      if (!report)
        return res.status(400).json({ msg: "Bài viết này không tồn tại." });

      res.json({ msg: "Đã báo cáo bài viết!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllPostsReport: async (req, res) => {
    try {
      const features = new APIfeatures(Posts.find({}), req.query).videoPaginating();
      const rpPosts = await features.query
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname followers report")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Success!",
        rpResult: rpPosts.length,
        rpPosts,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  adminDeletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
        user: req.params.userId,
      });
      await Comments.deleteMany({ _id: { $in: post.comments } });

      res.json({
        msg: "Đã xoá bài viết.",
        newPost: {
          ...post,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postCtrl;
