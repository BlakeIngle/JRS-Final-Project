const axios = require('axios');
const URL = `http://localhost:8080/api`

// product specific service functions

/**
 * 
 * @param {String} transactionId 
 * @returns an array of Purchased Items in the form of JSON objects 
 * for a single transaction with the specific transactionId
 */
function getItemsPurchasedByTransactionId(transactionId) {
    return axios.get(`${URL}/transactions/${transactionId}/items`);
}

/**
 * 
 * @param {String} transactionId 
 * @returns a single transaction object based on the 
 * individual transaction id
 */
function getTransactionById(transactionId) {
    return axios.get(`${URL}/transactions/${transactionId}`);
}

/**
 * 
 * @returns an array of all products in the form 
 * of JSON objects 
 */
function getAllProducts() {
    return axios.get(`${URL}/products`);
}

/**
 * 
 * @param {string} productId 
 * @returns  an product in the form 
 * of a JSON object based on the inidvidual
 * product id
 */
function getProductsById(productId) {
    return axios.get(`${URL}/products/${productId}`);
}

/**
 * 
 * @param {string} color 
 * @returns an array of all products with the specific
 * color property value in the form 
 * of JSON objects 
 */
function getProductsByColor(color) {
    return axios.get(`${URL}/products/color/${color}`);
}

/**
 * 
 * @param {string} style 
 * @returns an array of all products with the specific
 * style property value in the form 
 * of JSON objects 
 */
function getProductsByStyle(style) {
    return axios.get(`${URL}/products/style/${style}`);
}

/**
 * 
 * @param {string} size 
 * @returns an array of all products with the specific
 * size property value in the form 
 * of JSON objects 
 */
function getProductsBySize(size) {
    return axios.get(`${URL}/products/size/${size}`);
}

/**
 * 
 * @param {string} brand 
 * @returns an array of all products with the specific
 * brand property value in the form 
 * of JSON objects 
 */
function getProductsByBrand(brand) {
    return axios.get(`${URL}/products/brand/${brand}`);
}

/**
 * 
 * @param {float} rating 
 * @returns an array of all products with the specific
 * rating property value in the form 
 * of JSON objects 
 */
function getProductsByRating(rating) {
    return axios.get(`${URL}/products/rating/${rating}`);
}

/**
 * 
 * @param {string} category 
 * @returns an array of all products with the specific
 * category property value in the form 
 * of JSON objects 
 */
function getProductsByCategory(category) {
    return axios.get(`${URL}/products/category/${category}`);
}

/**
 * 
 * @param {string} params 
 * @returns an array of all products that match or include 
 * the substring of the search query withing the property values
 * in the form of JSON objects 
 */
function getProductsByQuery(params) {

    const queryString = new URLSearchParams(params).toString();

    return axios.get(`${URL}/products/search?` + queryString);
}

// user specific service functions

/**
 * 
 * @param {object} user 
 * @returns an object with the user properties 
 * and "posts" to the database to log the user in
 */
function login(user) {
    return axios.post(`${URL}/users/login`, user);
}

/**
 * 
 * @param {object} user 
 * @returns an object with the user properties 
 * and posts to the database to create a new user
 */
function createNewUser(user) {
    return axios.post(`${URL}/users`, user);
}

function getUserByEmail(email) {
    return this.login({ email, password: '' });
}

function getUserShoppingCartById(customerId) {
    return axios.get(`${URL}/carts/${customerId}`);
}

/**
 * 
 * @param {string} userId 
 * @returns an array of all transactions based on the
 * users id 
 */
function getAllTransactionsByUserId(userId) {
    return axios.get(`${URL}/transactions/user/${userId}`);
}

function updateUser(user) {
    return axios.put(`${URL}/users/${user.id}`, user);
}

/**
 * 
 * @param {string} id 
 * @returns deletes the user object within the database
 */
function deleteUserById(id) {
    return axios.delete(`${URL}/users/${id}`);
}

// cart/transaction specific service functions

/**
 * 
 * @param {string} userId 
 * @param {string} itemId 
 * @param {number} itemPrice 
 * @returns a post request to the database in the form of 
 * a JSON object
 */
function addItemToCart(userId, itemId, itemPrice) {
    return axios.post(`${URL}/carts`, { userId, itemId, itemPrice });
}

/**
 * 
 * @param {string} userId 
 * @param {number} total 
 * @param {array} products 
 * @returns a post request to the database in the form of 
 * a JSON object
 */
function createTransaction(userId, total, products) {
    return axios.post(`${URL}/transactions`, { userId, total, products });
}

/**
 * 
 * @param {string} itemId 
 * @param {string} userId 
 * @returns a put request to the database to decrease the quantity
 */
function decreaseQtyInCart(itemId, userId) {
    return axios.put(`${URL}/carts/decrease`, { itemId, userId })
}

/**
 * 
 * @param {string} itemId 
 * @param {string} userId 
 * @returns a put request to the database to increase the quantity
 */
function increaseQtyInCart(itemId, userId) {
    return axios.put(`${URL}/carts/increase`, { itemId, userId })
}

/**
 * 
 * @param {string} itemId 
 * @param {string} userId 
 * @returns a delete request to the database to delete the item
 */
function deleteCartItem(itemId, userId) {
    return axios.delete(`${URL}/carts/${userId}/${itemId}`);
}


const api = {
    getAllProducts,
    getProductsById,
    getProductsByColor,
    getProductsByStyle,
    getProductsBySize,
    getProductsByBrand,
    getProductsByRating,
    getProductsByCategory,
    login,
    createNewUser,
    getUserByEmail,
    updateUser,
    addItemToCart,
    getUserShoppingCartById,
    getAllTransactionsByUserId,
    createTransaction,
    deleteUserById,
    getProductsByQuery,
    getItemsPurchasedByTransactionId,
    getTransactionById,
    decreaseQtyInCart,
    increaseQtyInCart,
    deleteCartItem
}

function useApi() {
    return api;
}

export { useApi }