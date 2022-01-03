const Users = require("../models/useModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("./mailerCtrl");
const { sendResetPassword } = require("./mailerCtrl");
const PendingUser = require("../models/pendingUserModel");
const ResetPw = require("../models/resetPasswordModel");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      // let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username });
      if (user_name)
        return res.status(400).json({ msg: "Biệt danh đã tồn tại." });

      const user_email = await Users.findOne({ email });
      const pUser = await PendingUser.findOne({ email });
      if (pUser || user_email)
        return res.status(400).json({ msg: "Email đã tồn tại." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Mật khẩu phải trên 6 ký tự." });
      // ma hoa pass
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new PendingUser({
        fullname,
        username,
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

      await sendConfirmationEmail({ toUser: newUser, hash: newUser._id });

      res.json({
        msg: "Vui lòng xác nhận tài khoản tại Email vừa nhập!",
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
        "avatar username fullname followers following role isPrivate"
      );

      if (!user)
        return res.status(400).json({ msg: "Email này không tồn tại." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Mật khẩu không đúng." });

      if (user.isBan === true)
        return res.status(400).json({ msg: "Tài khoản của bạn đã bị cấm." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30day
      });
      res.json({
        msg: "Đăng nhập thành công!",
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
      return res.json({ msg: "Đăng xuất!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Vui lòng đăng nhập." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Vui lòng đăng nhập." });

          const user = await Users.findById(result.id)
            .select("-password")
            .populate(
              "followers following",
              "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "Người dùng không tồn tại." });

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

      res.json({ msg: `Người dùng ${id} đã được kích hoạt` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
      const {email} = req.body;
      
      try {
        const user = await Users.findOne({ email });
 
        if(!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });

        const hasHash = await ResetPw.findOne({userId: user._id});
        
        if(hasHash){
          return res.status(400).json({ msg: "Email yêu cầu đổi mật khẩu đã được gửi trước đó." });
        } 

        const hash = new ResetPw({userId: user._id});
        
        await hash.save();

        await sendResetPassword({ toUser: user, hash: hash._id });

        res.json({msg: "Vui lòng kiếm tra Email để đổi mật khẩu."})
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
  },

  resetPasswordChange: async (req, res) => {
    const {password, id} = req.body;
    
    try {
      const aHash = await ResetPw.findOne({_id: id});
      if (!aHash || !aHash.userId) {
        return res.status(404).json({msg: 'Không thể đổi mật khẩu!'});
      }

      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: aHash.userId },
        {
          password: passwordHash
        }
      );
      await aHash.remove();
      res.json({ msg: "Cập nhập thành công!" });

      // const user = await Users.findOne({_id: aHash.userId});
      // if (!user) {
      //   return res.status(404).json({msg: 'Cannot reset a password 123!'});
      // }

      // await user.remove();
      // await aHash.remove();

      // const passwordHash = await bcrypt.hash(password, 12);
      // const newUser = new Users({...user, password: passwordHash});

      // await newUser.save();
      // return res.json({msg: 'Password has been reseted!'});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
},
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
