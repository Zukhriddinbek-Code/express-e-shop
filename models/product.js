const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );
  }

  static fetchAll() {
    return products;
  }
};
