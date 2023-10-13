const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const adminRoute = require("./routes/admin");

app.use(bodyParser.urlencoded({ extended: false }));
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

app.use(adminRoute);

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from express js</h1>");
});

app.listen(3000);
