const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

router.get("/activated/user/:id", authCtrl.activateUser);

router.post("/reset-password", authCtrl.resetPassword);

router.post("/reset-password-change", authCtrl.resetPasswordChange);

module.exports = router;
