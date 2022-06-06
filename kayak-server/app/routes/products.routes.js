module.exports = (app) => {

    const products = require('../controllers/products.controller');
    
    app.get('/api/products', products.getAllProducts);
    app.get('/api/products/:id', products.getProductsById);
    app.get('/api/products/rating/:rating', products.getProductsByRating);
    app.get('/api/products/color/:color', products.getProductsByColor);
    app.get('/api/products/style/:style', products.getProductsByStyle);
    app.get('/api/products/brand/:brand', products.getProductsByBrand);
    app.get('/api/products/category/:category', products.getProductsByCategory);
    app.get('/api/products/search/:query', products.getProductsByQuery);

}