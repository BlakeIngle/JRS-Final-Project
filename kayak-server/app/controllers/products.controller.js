const db = require("../index");

// Gets all products from the products table 
// within the kayaks DB
exports.getAllProducts = (req, res) => {

  const query = `SELECT * FROM kayaks.products;`;

  db.query(query, (err, results) => {

    if (err) {
      res.status(500).send({
        message: "There was an error getting all products.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by id from the products table 
// within the kayaks DB
exports.getProductsById = (req, res) => {

  let productId = req.params.id;

  const query = `
        SELECT * FROM kayaks.products
            WHERE id = ? ;
      `;

  const placeholders = [productId];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by ID.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that ID",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by brand from the products table 
// within the kayaks DB
exports.getProductsByBrand = (req, res) => {

  let productBrand = req.params.brand;

  const query = `
        SELECT * FROM kayaks.products
            WHERE brand = ? ;
      `;

  const placeholders = [productBrand];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by Brand.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that brand",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by style from the products table 
// within the kayaks DB
exports.getProductsByStyle = (req, res) => {

  let productStyle = req.params.style;

  const query = `
        SELECT * FROM kayaks.products
            WHERE style = ? ;
      `;

  const placeholders = [productStyle];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by style.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that style",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by size from the products table 
// within the kayaks DB
exports.getProductsBySize = (req, res) => {

  let productSize = req.params.size;

  const query = `
        SELECT * FROM kayaks.products
            WHERE size = ? ;
      `;

  const placeholders = [productSize];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by size.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that size",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by color from the products table 
// within the kayaks DB
exports.getProductsByColor = (req, res) => {

  let productColor = req.params.color;

  const query = `
        SELECT * FROM kayaks.products
            WHERE color = ? ;
      `;

  const placeholders = [productColor];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by color.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that color",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by rating from the products table 
// within the kayaks DB
exports.getProductsByRating = (req, res) => {

  let productRating = req.params.rating;

  const query = `
        SELECT * FROM kayaks.products
            WHERE rating = ? ;
      `;

  const placeholders = [productRating];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by rating.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found with that rating",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products by category from the products table 
// within the kayaks DB
exports.getProductsByCategory = (req, res) => {

  let productCategory = req.params.category;

  const query = `
        SELECT * FROM kayaks.products
            WHERE category = ? ;
      `;

  const placeholders = [productCategory];

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by category.",
          error: err,
        });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No products found in that category",
      });
    } else {
      res.send({
        products: results,
      });
    }
  });
};

// Gets all products from the products table 
// within the kayaks DB where the 
//product property values match or 
//include the substring search query 
exports.getProductsBySearch = (req, res) => {

  var filters = ``;
  var placeholders = [];

  let entries = Object.entries(req.query);
  for (let [key, value] of entries) {
    filters += ` ?? LIKE ? AND`;
    placeholders.push(key, `%${value}%`);
  }
  filters = filters.slice(0, -3);

  const query = `
    SELECT * FROM kayaks.products
        WHERE 
            ${filters}
        ;`;

  db.query(query, placeholders, (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: "There was an error getting products by search filter.",
          error: err
        })
    } else if (results.length == 0) {
      res.status(404)
        .send({
          message: "no products found with that search filter"
        })
    } else {
      res.send({
        products: results
      });
    }
  });
}
