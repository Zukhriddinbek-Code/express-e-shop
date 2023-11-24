//mongodb simple
//installing packages
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

//connecting to mongodb cloud
const mongoConnect = (callback) => {
  // cqc2jZjrxTHfH56e password for zuhriddin_ganiev user
  MongoClient.connect(
    "mongodb+srv://zuhriddin_ganiev:cqc2jZjrxTHfH56e@cluster-zuhriddin.65mbqpl.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("CONNECTED");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;

/*
//just sql
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "ganiev1017",
});
module.exports = pool.promise();
*/

/*
//sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "ganiev1017", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
*/
