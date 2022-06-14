const db = require("../index");

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

exports.getProductsBySearch = (req, res) => {
    console.log(req.query);

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

        console.log(query, placeholders);
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
