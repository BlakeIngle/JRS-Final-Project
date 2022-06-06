import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from './services/toasts/toastService'
import './index.css';
import App from './App';
import Homepage from './components/homePage/HomePage'
import ProductPage from './components/products/ProductPage'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import OrderSuccess from './components/orders/OrderSuccess'
import PastOrders from './components/orders/PastOrders'
import PageNotFound from './components/pageNotFound/PageNotFound'
import LogInPage from './components/log-in-out/LoginPage'
import SignUpPage from './components/log-in-out/SignupPage'
import NavBar from './components/navBar/NavBar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<App />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orderconfirm/:transactionId" element={<OrderSuccess />} />
          <Route path="/transactions" element={<PastOrders />} />
          <Route path="*" element={<PageNotFound /> } />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
