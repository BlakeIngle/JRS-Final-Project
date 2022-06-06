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
 * @returns 
 */
function getTransactionById(transactionId) {
    return axios.get(`${URL}/transactions/${transactionId}`);
}

function getAllProducts() {
    return axios.get(`${URL}/products`);
}

function getProductById(id) {
    return axios.get(`${URL}/products/${id}`);
}

function getProductsByColor(color) {
    return axios.get(`${URL}/products/color/${color}`);
}

function getProductsByStyle(style) {
    return axios.get(`${URL}/products/style/${style}`);
}

function getProductsByBrand(brand) {
    return axios.get(`${URL}/products/brand/${brand}`);
}

function getProductsByRating(rating) {
    return axios.get(`${URL}/products/rating/${rating}`);
}

function getProductsByCategory(style) {
    return axios.get(`${URL}/products/category/${category}`);
}

function getProductsByQuery(params) {

    const queryString = new URLSearchParams(params).toString();

    return axios.get(`${URL}/products/search?` + queryString);
}

// user specific service functions
function login(user) {
    return axios.post(`${URL}/users/login`, user);
}

function createNewUser(user) {
    return axios.post(`${URL}/users`, user);
}

function getUserByEmail(email) {
    return this.login({ email, password: '' });
}

function getUserShoppingCartById(customerId) {
    return axios.get(`${URL}/carts/${customerId}`);
}

function getAllTransactionsByUserId(userId) {
    return axios.get(`${URL}/transactions/user/${userId}`);
}

function updateUser(user) {
    return axios.put(`${URL}/users/${user.id}`, user);
}

function deleteUserById(id) {
    return axios.delete(`${URL}/users/${id}`);
}

// cart/transaction specific service functions
function addItemToCart(userId, itemId, itemPrice) {
    return axios.post(`${URL}/carts`, { userId, itemId, itemPrice });
}

function createTransaction(userId, total, products) {
    return axios.post(`${URL}/transactions`, { userId, total, products });
}

function decreaseQtyInCart(itemId, userId ) {
    return axios.put(`${URL}/carts/decrease`, {itemId, userId})
}

function increaseQtyInCart(itemId, userId) {
    return axios.put(`${URL}/carts/increase`, {itemId, userId})
}

function deleteCartItem(itemId, userId) {
    return axios.delete(`${URL}/carts/${userId}/${itemId}`);
}


const api = {
    getAllProducts,
    getProductById,
    getProductsByColor,
    getProductsByStyle,
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