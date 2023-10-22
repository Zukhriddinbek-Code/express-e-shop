const express = require("express");
const path = require("path");
const rootDir = require("./util/path");

const app = express();
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoute);

//404 error page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "error.html"));
});

app.listen(3000);
