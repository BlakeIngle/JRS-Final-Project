import React from 'react'
import '../products/ProductPage.css'
import { useEffect, useState } from 'react';
import ProductCard from '../products/ProductCard';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Search from '../navBar/Search';


function ProductPage() {

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const ls = useLocalStorage();
  let user = ls.getUser();
  let { category, style, size } = useParams();
  const http = useApi();
  const navigate = useNavigate();


  /**
   * This function will get all products
   * unless a category, style, or size are 
   * provided/defined. In which case it will 
   * return all products based on the value 
   * provided
   */
  function getProducts() {
    if (!category && !style && !size) {
      http.getAllProducts()
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting all products");
          navigate('*')
        })
    } else if (category && !style && !size) {
      http.getProductsByCategory(category)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting category:", category);
          navigate('*')
        })
    } else if (style && !category && !size) {
      http.getProductsByStyle(style)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting style:", style);
          navigate('*')
        })
    } else if (size && !category && !style) {
      http.getProductsBySize(size)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting size:", size);
          navigate('*')
        })
    } else {
      console.error("There was an error getting any products")
      navigate('*')
    }
  }

  /**
 * 
 * @param {string} longString 
 * @param {string} subString
 * This function removes all punctuation
 * within the search query or object property value 
 */
  function hasSubstringCaseInsensitive(longString, subString) {

    longString = longString.toLowerCase()
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll("'", '');

    subString = subString.toLowerCase()
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll("'", '');

    return longString.includes(subString)
  }

  /**
   * 
   * @param {string} newQuery 
   * Sets the search query to the value,
   * of the new query
   */
  function onInputChanged(newQuery) {
    setSearchQuery(newQuery)
  }

  /**
   * Renders the page with the apprpriate
   * products based on the values provided
   * or not provided (category, style, size & query)
   */
  useEffect(() => {
    getProducts();

  }, [category, style, searchQuery, size]);

  /**
   * 
   * @param {object} product 
   * @returns boolean
   * This function checks to see if the 
   * search query substring is included within 
   * the values of the object properties
   */
  function doesItemMatchSearchQuery(product) {
    let { name, color, brand, category, size, style } = product
    if (hasSubstringCaseInsensitive(name, searchQuery)) {
      return true;
    } else if (hasSubstringCaseInsensitive(brand, searchQuery)) {
      return true;
    } else if (hasSubstringCaseInsensitive(color, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(category, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(size, searchQuery)) {
      return true
    } else if (hasSubstringCaseInsensitive(style, searchQuery)) {
      return true
    } else {
      return false;
    }
  }

  return (

    <div className="products-root">
      <h1 className='header'>
        SUMMER STARTS HERE!
      </h1>

      <div className="search-bar-container">
        <Search onChange={onInputChanged} />
      </div>

      <div className="products-container">

        {products.filter(product => {
          if (searchQuery == '') {
            return true
          }
          return doesItemMatchSearchQuery(product)
        })
          .map(product => <ProductCard key={product.id} {...product} />)}

      </div>
    </div>
  );
}

export default ProductPage;
