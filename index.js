require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const products_controller = require("./products_controller");

const port = 8080;

const app = express();
app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    //   console.log("dbInstance: ", dbInstance);
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

// app.post("/api/products", (req, res) => {
//   let { name, description, price, image_url } = req.body;
//   let db = req.app.get("db");
//   db.create_product([name, description, price, image_url]).then(products => {
//     res.status(200).json(products);
//   });
// });

// app.get("/api/products", (req, res) => {
//   let db = req.app.get("db");
//   db.read_products().then(products => {
//     return res.status(200).json(products);
//   });
// // });

// app.get("/api/products", (req, res) => {
//     // console.log(req.query)

//     let db = req.app.get("db");
//     if (req.query.id) {
//       db.read_product(req.query.id).then(product => {
//         return res.status(200).json(product);
//       });
//     }

app.post("/api/product", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.delete("/api/product/:id", products_controller.delete);

app.listen(port, () => {
  console.log(`Server Listenong On Port ${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const massive = require('massive');
// require('dotenv').config()
// const products_controller = require('./products_controller');

// const app = express();
// app.use( bodyParser.json() );
// massive( process.env.CONNECTION_STRING ).then( dbInstance => {
//   app.set('db', dbInstance)
// }).catch( err => console.log(err) );

// app.post( '/api/product', products_controller.create );
// app.get( '/api/products', products_controller.getAll );
// app.get( '/api/product/:id', products_controller.getOne );
// app.put( '/api/product/:id', products_controller.update );
// app.delete( '/api/product/:id', products_controller.delete );

// const port = process.env.PORT || 3005;
// app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
