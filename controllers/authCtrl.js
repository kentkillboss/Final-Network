const Users = require("../models/useModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendConfirmationEmail} = require('./mailerCtrl');
const PendingUser = require('../models/pendingUserModel');

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name)
        return res.status(400).json({ msg: "User name already exists." });

      const user_email = await Users.findOne({ email });
      const pUser = await PendingUser.findOne({ email });
      if (pUser || user_email)
        return res.status(400).json({ msg: "Email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });
      // ma hoa pass
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new PendingUser({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      // //test
      // await newUser.save();
      // res.json({message: 'You have been registered, check your email address.'})

      // const access_token = createAccessToken({ id: newUser._id });
      // const refresh_token = createRefreshToken({ id: newUser._id });

      // res.cookie("refreshtoken", refresh_token, {
      //   httpOnly: true,
      //   path: "/api/refresh_token",
      //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
      // });

      await newUser.save();

      await sendConfirmationEmail({toUser: newUser, hash: newUser._id})

      res.json({
        msg: "Please visit your email address and active your account!",
        // access_token,
        // user: {
        //   ...newUser._doc,
        //   password: "",
        // },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following role"
      );

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      if (user.isBan === true)
        return res.status(400).json({ msg: "Your account has been banned." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
      });
      res.json({
        msg: "Login Successfully!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.json({
            access_token,
            user,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateUser: async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await PendingUser.findById(id);

      const newUser = new Users({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        password: user.password,
        gender: user.gender,
      });

      await newUser.save();
      await user.remove();
      
      res.json({msg: `User ${id} has been activated`})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  // activateUser: async (req, res) => {
  //   const hash = req.query.hash;
  //   if(!hash) {
  //     return res.status(404).json({ msg: 'Cannot validate an User!' });
  //   }
  //   const response = await fetch(`http://localhost:5000/api/activate/user/${hash}`);
  //   if
  //   (response.status > = 400){
  //     return res.status(404).json({ msg: 'Cannot validate an User!' });
  //   }else{
  //     res.writeHead(307, {Location: 'users/activated'});
  //     res.end();
  //   }
  // },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
