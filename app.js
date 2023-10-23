const express = require("express");
const path = require("path");
const rootDir = require("./util/path");

const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoute);

//404 error page
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found!" });
});

app.listen(3000);
