const app = express();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//creating a middleware for user
//this will only register a middleware for incoming request
app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
