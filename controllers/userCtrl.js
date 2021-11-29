const Users = require("../models/useModel");
const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Messages = require("../models/messageModels");
const Conversations = require("../models/conversationModel");
const pendingFollow = require("../models/pendingFollow");
const Notify = require("../models/notifyModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar email mobile address isBan");

      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        background,
        fullname,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;
      if (!fullname)
        return res.status(400).json({ msg: "Please add your fullname." });
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          background,
          fullname,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );
      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res.status(500).json({ msg: "You followed this user." });

      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  suggestionUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 7;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res.json({
        users,
        result: users.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await Users.find({}).select("-password");

      res.json({
        msg: "Success!",
        result: users.length,
        users,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  isBan: async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          isBan: true,
        }
      );

      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isUnBan: async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          isBan: false,
        }
      );

      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isPrivate: async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          isPrivate: true,
        }
      );

      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isPublic: async (req, res) => {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          isPrivate: false,
        }
      );

      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  requestFollow: async (req, res) => {
    const {senderId, recipientId} = req.body;
    try {
      const pFollow = await pendingFollow.findOne({ senderId });
      if (pFollow)
        return res.status(400).json({ msg: "Đã gửi yều cầu trước đây." });
      const follow = new pendingFollow({senderId, recipientId});
      
      await follow.save();

      res.json({id: follow._id, msg: 'Đã gửi yêu cầu theo dõi!'})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  acceptFollow: async (req, res) => {
    const {id, notifyId} = req.body;
    
    try {
      const pFollow = await pendingFollow.findById(id);

      const notify = await Notify.findById(notifyId);

      const newUser = await Users.findOneAndUpdate(
        { _id: pFollow.recipientId },
        {
          $push: { followers: pFollow.senderId },
        },
        { new: true }
      ).populate("followers following", "-password");

      await Users.findOneAndUpdate(
        { _id: pFollow.senderId },
        {
          $push: { following: pFollow.recipientId },
        },
        { new: true }
      );

      await pFollow.remove();
      await notify.remove();

      res.json({ newUser });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  changePassword: async (req, res) => {
    const {id, oldPassword, newPassword} = req.body;
    // console.log(id, oldPassword, newPassword);
    try {
      const user = await Users.findById(id);

      bcrypt.compare(oldPassword, user.password, async (err, data) => {
        if (err) return res.status(500).json({ msg: err.message });

        if (data) {
          const passwordHash = await bcrypt.hash(newPassword, 12);
          await Users.findOneAndUpdate(
            {
              _id: id
            },
            {
              password: passwordHash
            }
            );

            res.json({msg: 'Change password success'});
        }else {
          return res.status(404).json({msg: 'Wrong password!'});
        }
    })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPendingFollows: async (req, res) => {
    try {
      const user = await pendingFollow.find({});

      res.json({msg: 'get request user success',
      requestFollow: user
      })

      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  cancelRequest: async (req, res) => {
    const {senderId, recipientId} = req.body;
    try {
      const pFollow = await pendingFollow.findOne({ senderId, recipientId });
      const Notifies = await Notify.findOne({ user: senderId, request: true, recipients: {$in: [recipientId]} });
      
      await pFollow.remove();
      await Notifies.remove();

      res.json({msg: 'Đã huỷ yêu cầu!'})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unAcceptFollow: async (req, res) => {
    const {id, notifyId} = req.body;
    
    try {
      const pFollow = await pendingFollow.findById(id);

      const notify = await Notify.findById(notifyId);

      await pFollow.remove();
      await notify.remove();

      res.json({ msg: 'Không chấp nhận yêu cầu' });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
