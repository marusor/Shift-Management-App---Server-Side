const express = require("express");
const router = express.Router();
let CommentController = require("../controllers/comments-controller");
let permission = require("../middleware/permission");

router.get("/", permission, CommentController.getAllComents);
router.post("/", permission, CommentController.addNewComment);
router.get("/:commentId", CommentController.getCommentById);
router.delete("/:commentId", CommentController.deleteCommentById);
router.patch("/:commentId", CommentController.updateComment);

module.exports = router;
