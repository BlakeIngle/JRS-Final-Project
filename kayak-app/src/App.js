import logo from './logo.svg';
import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from './services/toasts/toastService'
import Homepage from './components/homePage/HomePage'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import OrderSuccess from './components/orders/OrderSuccess'
import PastOrders from './components/orders/PastOrders'
import PageNotFound from './components/pageNotFound/PageNotFound'
import LoginForm from './components/log-in-out/LoginForm'
import SignupForm from './components/log-in-out/SignupForm'
import NavBar from './components/navBar/NavBar'
import ProductCard from './components/products/ProductCard';
import { useApi } from './services/axios.service';
import ProductPage from './components/products/ProductPage';
import LogoutForm from './components/log-in-out/UserPage';
import UserPage from './components/log-in-out/UserPage';
import ProductDetails from './components/products/ProductDetails';
import BurgerMenu from './components/navBar/BurgerMenu';

export const Context = createContext(null);

function App() {

  const http = useApi();
  const [products, setProducts] = useState([])
  let [cart, setCart] = useState([])


  const addItem = (item) => {

    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];

    //assuming we have an ID field in our item
    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == item.id);

    //if item already exists
    if (existingItem) {
      existingItem.quantity++ //update item
    } else { //if item doesn't exist, simply add it
      item.quantity = 1;
      cartCopy.push(item)
    }

    //update app state
    setCart(cartCopy)
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)
    
  }

  const increaseQty = (itemId) => {
    let cartCopy = [...cart];

    //assuming we have an ID field in our item
    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == itemId);
    existingItem.quantity++
    setCart(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  }

  const decreaseQty = (itemId) => {
    let cartCopy = [...cart];

    //assuming we have an ID field in our item
    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == itemId);
    existingItem.quantity--
    setCart(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  }

  const clearCart = () => {
    
    setCart([]);
    
    localStorage.removeItem('cart' );
  }

  const removeItem = (itemId) => {
    let cartCopy = [...cart]
    cartCopy = cartCopy.filter(item => item.id != itemId);

    //update state and local
    setCart(cartCopy);
    let stringCart = JSON.stringify(cart);
    localStorage.removeItem("cart", stringCart)
  }


  function getProducts() {
    http.getAllProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch(() => {
        console.log("error getting all")
      })
  }

  useEffect(() => {
    console.log("app initialized");
    getProducts();
    let localCart = localStorage.getItem("cart");

    // //turn it into js
    // console.log(localCart);

    //load persisted cart into state if it exists
    if (localCart) {
      localCart = JSON.parse(localCart);
      console.log(localCart);
      setCart(localCart)
    }
  }, []) //the empty array ensures useEffect only runs once


  return (
    <Context.Provider value={{ cart, addItem, removeItem, increaseQty, decreaseQty, clearCart }}>
      <div className="App">
        <ToastProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/login" element={<LoginForm />} />
              {/* <Route path="/user" element={<UserPage />} /> */}
              {/* <Route path="/product/:id" element={<ProductCard />} /> */}
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/style/:style" element={<ProductPage />} />
              <Route path="/products/category/:category" element={<ProductPage />} />
              <Route path="/products/search/:query" element={<ProductPage />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/ordersuccess/:transactionId" element={<OrderSuccess />} />
              <Route path="/purchases" element={<PastOrders />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </Context.Provider>
  );
}

export default App;
