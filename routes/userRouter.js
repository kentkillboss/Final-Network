const router = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/userCtrl");

router.get("/search", auth, userCtrl.searchUser);
router.get("/users", auth, userCtrl.getUsers);
router.get("/user/:id", auth, userCtrl.getUser);
router.patch("/user", auth, userCtrl.updateUser);
router.patch("/user/:id/follow", auth, userCtrl.follow);
router.patch("/user/:id/unfollow", auth, userCtrl.unfollow);
router.get("/suggestionUser", auth, userCtrl.suggestionUser);
router.patch("/isBan/:id", auth, userCtrl.isBan);
router.patch("/isUnBan/:id", auth, userCtrl.isUnBan);
router.patch("/isPrivate/:id", auth, userCtrl.isPrivate);
router.patch("/isPublic/:id", auth, userCtrl.isPublic);
router.post("/requestFollow", auth, userCtrl.requestFollow);
router.post("/acceptFollow", auth, userCtrl.acceptFollow);
router.post("/changePassword", auth, userCtrl.changePassword);

module.exports = router;
