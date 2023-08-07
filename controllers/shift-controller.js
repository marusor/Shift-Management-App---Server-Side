let Shift = require("../models/shifts");
let mongoose = require("mongoose");

exports.getAllShifts = (req, res) => {
  Shift.find()
    .select("userId start end perHour place created updated _id")
    .exec()
    .then((docs) => {
      let response = {
        count: docs.length,
        shifts: docs.map((doc) => {
          return {
            _id: doc._id,
            userId: doc.userId,
            start: doc.start,
            end: doc.end,
            perHour: doc.perHour,
            place: doc.place,
            created: doc.created,
            updated: doc.updated,

            request: {
              type: "GET",
              url: "http://localhost:3000/shift-route/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json({
        message: "all shifts",
        shifts: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "err",
        error: err,
      });
    });
};

exports.getAllShiftsByUser = (req, res) => {
  let userId = req.params.userId;

  Shift.find({ userId: userId })
    .select("_id userId start end perHour place created updated")
    .exec()
    .then((shifts) => {
      if (!shifts) {
        return res.status(404).json({
          message: "Shifts not found",
        });
      }
      res.status(200).json({
        message: "Shifts by User",
        shifts: shifts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getShiftById = (req, res) => {
  let shift = req.params.lateShift;
  Shift.findById(shift)
    .select("start end perHour created updated _id")
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Shift: doc,
          request: {
            type: "GET",
            description: "Get All Shifts",
            url: "http://localhost:3000/shift-route",
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.addShift = (req, res) => {
  let userId = req.userData.userId;
  let modelShift = new Shift({
    _id: new mongoose.Types.ObjectId(),
    userId: userId,
    start: req.body.start,
    end: req.body.end,
    perHour: req.body.perHour,
    place: req.body.place,
    created: new Date().toLocaleString("en-GB"),
    updated: "",
  });
  modelShift
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created Shift Successfully",
        createdShift: {
          _id: result._id,
          userId: userId,
          start: result.start,
          end: result.end,
          perHour: result.perHour,
          place: result.place,
          created: result.created,
          updated: result.updated,
          request: {
            type: "GET",
            url: "http://localhost:3000/shift-route/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      console.log(err);
    });
};

exports.updateShiftById = (req, res) => {
  let id = req.params.lateShift;
  let update = {};
  for (let elements of req.body) {
    update[elements.propName] = elements.value;
  }
  update.updated = new Date().toLocaleString("en-GB");
  Shift.updateOne({ _id: id }, { $set: update })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Updated shift!",
        request: {
          type: "GET",
          url: "http://localhost:3000/shift-route/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteShiftById = (req, res) => {
  const id = req.params.lateShift;
  Shift.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Shift Deleted Successfully!",
        request: {
          type: "POST",
          url: "http://localhost:3000/shift-route",
          body: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
