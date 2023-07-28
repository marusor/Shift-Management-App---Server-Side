let User = require("../models/user");
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// SignUp
exports.signUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: "This email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            let user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              comments: [],
              created: new Date().toLocaleString("en-GB"),
              updated: "",
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User was successfully created",
                  result: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
// Login
exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .populate("comments")
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.message(401).json({
            message: "Auth failed",
          });
        } else if (result) {
          let token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successfull",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Get all Users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("email firstname lastname password created updated comments")
    .populate("comments")
    .exec()
    .then((docs) => {
      console.log(docs);
      let response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            _id: doc._id,
            email: doc.email,
            password: doc.password,
            lastname: doc.lastname,
            firstname: doc.firstname,
            comments: doc.comments,
            created: doc.created,
            updated: doc.updated,
          };
        }),
      };
      res.status(200).json({
        message: "All Úsers",
        Users: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "aici",
        error: err,
      });
    });
};

// Get User By Id
exports.getUserById = (req, res, next) => {
  let user = req.params.userID;
  User.findById(user)
    .exec()
    .then((doc) => {
      res.status(200).json({
        User: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Delete User
exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((err) => {
      res.status(200).json({
        error: err,
      });
    });
};

// Update User
exports.updateUserById = (req, res, next) => {
  let id = req.params.userId;
  let update = {};
  for (let elements of req.body) {
    update[elements.propName] = elements.value;
  }
  update.updated = new Date().toLocaleString("en-GB");
  User.updateOne({ _id: id }, { $set: update })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User updated successfully",
        request: {
          type: "GET",
          url: "http://localhost:3000/user-route/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "aici",
        error: err,
      });
    });
};
