import React from 'react'
import '../products/ProductPage.css'
import { useEffect, useState } from 'react';
import ProductCard from '../products/ProductCard';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Link, useParams } from 'react-router-dom';
import Search from '../navBar/Search';


function ProductPage() {

  // const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([])
  const ls = useLocalStorage();
  let user = ls.getUser();
  let { category, style } = useParams();
  const http = useApi();

  function getProducts() {
    if (!category && !style) {
      http.getAllProducts()
        .then((response) => {
          console.log(category, style)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting all products");
        })
    } else if (category && !style) {
      http.getProductsByCategory(category)
        .then((response) => {
          console.log(response)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting ", category);
        })
    } else if (style && !category) {
      http.getProductsByStyle(style)
        .then((response) => {
          console.log(response)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.log("error getting ", style);
        })
    } else {
      console.error("There was an error getting any products")
    }
  }

  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   if (onSubmit) {
  //     onSubmit(searchQuery);
  //     console.log('search submitted')
  //   }
  //   return;
  // }

  const [formData, setFormData] = useState({
    search: ''
  })

  function onInputChanged(e) {
    let value = e.target.value
    let name = e.target.name

    setFormData({
      ...formData,
      [name]: value
    });
  }


  useEffect(() => {
    getProducts();

  }, [category, style, formData]);

  return (

    <div className="products-root">

      <h1 className='header'>
        SUMMER STARTS HERE!
      </h1>
      <div className="search-bar-container">

        <Search
          onChange={() => { onInputChanged() }} />
      </div>

      <div className='products-container'>

        {products.map(product => <ProductCard key={product.id} {...product} />)}

      </div>

      {/* array.map data => cards */}
    </div>
  );
}

export default ProductPage;