const router = require("express").Router();
const noteCtrl = require("../controllers/noteCtrl");
const auth = require("../middleware/auth");

router
  .route("/notes")
  .post(auth, noteCtrl.createNote)
  .get(auth, noteCtrl.getNotes);

router
  .route("/note/:id")
  .patch(auth, noteCtrl.updateNote)
  .get(auth, noteCtrl.getNoteById)
  .delete(auth, noteCtrl.deleteNote);
router.route("/untoggle/:id").post(auth, noteCtrl.unNoti);

module.exports = router;
