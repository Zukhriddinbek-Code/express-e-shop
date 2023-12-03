// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; //{items: [ ]}
//     this._id = id; // ? new mongodb.ObjectId(id) : null;
//   }

//   //saving user into db
//   save() {
//     const db = getDb();
//     return db.collection("users").insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cartProds) => {
//       return cartProds.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((i) => {
//       return i.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((prod) => {
//           return {
//             ...prod,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === prod._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }

//   //deleting cart items
//   deleteItemFromCart(prodId) {
//     const db = getDb();
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== prodId.toString();
//     });

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   //adding orders
//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((cartProds) => {
//         const order = {
//           items: cartProds,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };

//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   //get order items
//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   //finding user
//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((err) => {
//         console.log(err);
//       }); //no need to next(), this will give the only element we want
//   }
// }

// module.exports = User;
