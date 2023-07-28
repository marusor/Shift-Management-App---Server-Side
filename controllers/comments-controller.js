let mongoose = require("mongoose");
let Comment = require("../models/comments");
let User = require("../models/user");

exports.getAllComents = (req, res, next) => {
  Comment.find()
    .select("_id userId description created updated")
    .then((docs) => {
      let response = {
        counts: docs.length,
        comments: docs.map((doc) => {
          return {
            _id: doc._id,
            userId: doc.userId,
            description: doc.description,
            created: doc.created,
            updated: doc.updated,
          };
        }),
      };
      res.status(200).json({
        message: "All Comments",
        comments: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.addNewComment = (req, res, next) => {
  let userId = req.userData.userId;
  console.log(userId);
  let modelComment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    description: req.body.description,
    created: new Date().toLocaleString("en-GB"),
    updated: "",
  });
  modelComment
    .save()
    .then((result) => {
      User.findById(userId)
        .exec()
        .then((user) => {
          user.comments.push(result);
          return user.save();
        })
        .then(() => {
          res.status(201).json({
            message: "Comment created Successfully!",
            Comment: {
              _id: result._id,
              userId: userId,
              description: result.description,
              created: result.created,
              updated: result.updated,
              request: {
                type: "GET",
                url: "http://localhost:3000/comment-route/" + result._id,
              },
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Failed to update user comments",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getCommentById = (req, res, next) => {
  let comment = req.params.commentId;
  Comment.findById(comment)
    .select("_id userID description created updated")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          Comment: doc,
          request: {
            type: "Get",
            url: "http://localhost:3000/comment-route",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteCommentById = (req, res, next) => {
  let id = req.params.commentId;
  Comment.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted successfully",
      });
    })

    .catch((err) => {
      res.status(500).json({
        message: "error",
        error: err,
      });
    });
};

exports.updateComment = (req, res, next) => {
  let id = req.params.commentId;
  let update = {};
  for (let elements of req.body) {
    update[elements.propName] = elements.value;
  }
  update.updated = new Date().toLocaleString("en-GB");
  Comment.updateOne({ _id: id }, { $set: update })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment updated successfully",
        request: {
          type: "GET",
          url: "http://localhost:3000/comment-route/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
