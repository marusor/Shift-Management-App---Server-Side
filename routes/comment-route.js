const express = require("express");
const router = express.Router();
let CommentController = require("../controllers/comments-controller");
let permission = require("../middleware/permission");
let Admin = require("../middleware/admin-permission");

router.get("/", Admin, CommentController.getAllComents);
router.post("/", permission, CommentController.addNewComment);
router.get("/:commentId", CommentController.getCommentById);
router.get("/user/:userId", CommentController.getAllCommentsByUser);
router.delete("/:commentId", Admin, CommentController.deleteCommentById);
router.patch("/:commentId", CommentController.updateComment);

module.exports = router;
