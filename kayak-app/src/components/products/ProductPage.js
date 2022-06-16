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
  let { category, style } = useParams();
  const http = useApi();
  const navigate = useNavigate();


  function getProducts() {
    if (!category && !style) {
      http.getAllProducts()
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting all products");
          navigate('*')
        })
    } else if (category && !style) {
      http.getProductsByCategory(category)
        .then((response) => {
          console.log(response)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting category:", category);
          navigate('*')
        })
    } else if (style && !category) {
      http.getProductsByStyle(style)
        .then((response) => {
          console.log(response)
          setProducts(response.data.products);
        })
        .catch(() => {
          console.error("error getting style:", style);
          navigate('*')
        })
    } else {
      console.error("There was an error getting any products")
      navigate('*')
    }
  }



  // This was copied from a colleague  and is not implemented anywhere.
  function checkIfProductContainsKeyword(product, keyword) {
    // search all products to see if any of them match the given keyword
    for (let i = 1; i < 16; i++) {

      // if there is another value, check it, 
      //   else (undefinded), do not check it. That would be an error
      let _keyword = product["strKeyword" + [i]]
      if (!_keyword) {
        return false
      }

      if (hasSubstringCaseInsensitive(_keyword, product)) {
        return true;
      }
    }
    return false;
  }

  /**
 * This was copied from a colleague, not sure how or where to
 * implement this, so its just here
 * @param {string} longString 
 * @param {string} subString 
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

  function onInputChanged(newQuery) {
    console.log(newQuery);
    setSearchQuery(newQuery)
  }

  useEffect(() => {
    getProducts();

  }, [category, style, searchQuery]);

  // function doesItemMatchSearchQuery(product) {
  //   let {name, color, brand, category, size, style, price} = product



  // }


  return (

    <div className="products-root">

      <h1 className='header'>
        SUMMER STARTS HERE!
      </h1>
      <div className="search-bar-container">

        <Search onChange={onInputChanged} />

        {/* {category ? category.toUpperCase() : ''} */}

      </div>

      <div className="products-container">

        {/* {products.map(product => <ProductCard key={product.id} {...product} />)} */}


        {products.filter(() => {
          if (searchQuery == '') {
            return true

          }
          else {
            const searchKeyword = searchQuery.toLowerCase()
            return products.name.toLowerCase().includes(searchKeyword)
          }
        })
          .map(product => <ProductCard key={product.id} {...product} />)}

      </div>

    </div>
  );
}

export default ProductPage;