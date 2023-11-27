const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  //saving user into db
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  //finding user
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) }); //no need to next(), this will give the only element we want
  }
}

module.exports = User;
