let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let port = process.env.PORT || 3000;

let shiftRoute = require("./routes/shift-route");
let userRoute = require("./routes/user-route");
let commentRoute = require("./routes/comment-route");
const uri =
  "mongodb+srv://bamarincean:tastatura1@bogdan.lqpeeyn.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Nethods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/shift-route", shiftRoute);
app.use("/user-route", userRoute);
app.use("/comment-route", commentRoute);

app.use((req, res, next) => {
  let error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  try {
    console.log("Its working");
  } catch (error) {
    console.log(error);
  }
});
