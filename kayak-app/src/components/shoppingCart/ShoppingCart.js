import { useApi } from '../../services/axios.service'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../shoppingCart/ShoppingCart.css'
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../../services/localStorage.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../../App';

export default function ShoppingCart() {

  const { cart, addItem, decreaseQty, increaseQty, removeItem, clearCart } = useContext(Context)
  const http = useApi();
  const ls = useLocalStorage();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth)


  // const [products, setProducts] = useState([])
  // const [cart, setCart] = useState([]);

  let user = ls.getUser();

  let subTotal = calculateTotalPrice(cart);
  const tax = .07 * subTotal;
  const shipping = 15.00;
  const grandTotal = subTotal + tax + shipping;

  function calculateTotalPrice(cart) {
    let sum = 0;

    // calculate sum of individual price of every item
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i]?.price * cart[i]?.quantity;
    }
    return sum;
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  // function getUserShoppingCart() {
  //     if (user) {
  //         http.getUserShoppingCartById(user.id)
  //             .then((response) => {
  //                 const watches = response?.data?.watches
  //                 setCartItems(watches);
  //             })
  //             .catch(() => {
  //                 console.log("error getting shopping cart")
  //             })
  //     } else {
  //         console.log('not logged in');
  //     }
  // }

  // function onDecrease(itemId, quantity) {
  //     if (quantity <= 1) {
  //         // maybe POP UP: 'Are you sure?'
  //         http.deleteCartItem(itemId, user.id)
  //             .then((response) => {

  //                 setCartItems(cart.filter(
  //                     (item) => item.id !== itemId));
  //             })
  //             .catch(() => {
  //                 console.error("error deleting item")
  //             })
  //     } else {
  //         http.decreaseQtyInCart(itemId, user.id)
  //             .then((response) => {
  //                 setCartItems(cart.map(item => {
  //                     if (item.id == itemId) {
  //                         return {
  //                             ...item,
  //                             quantity: item.quantity - 1
  //                         }
  //                     } else {
  //                         return item;
  //                     }
  //                 }));
  //             })
  //             .catch(() => {
  //                 console.error("error reducing quantity!")
  //             })
  //     }
  // }

  // function onIncrease(itemId) {
  //     http.increaseQtyInCart(itemId, user.id)
  //         .then((response) => {

  //             setCartItems(cart.map(item => {
  //                 if (item.id == itemId) {
  //                     return {
  //                         ...item,
  //                         quantity: item.quantity + 1
  //                     }
  //                 } else {
  //                     return item;
  //                 }
  //             }));
  //         })
  //         .catch(() => {
  //             console.error("error increasing quantity!")
  //         })

  // }

  function onDecreaseClicked(itemId) {
    decreaseQty(itemId)
    // .then((cart) => {
    //   decreaseQty(cart.item);
    // }).catch((err) => {
    //   console.error('There was an error decreasing quantity in cart')
    // })
  }

  function onIncreaseClicked(itemId) {
    increaseQty(itemId)
    // .then((cart) => {
    //   decreaseQty(cart.item);
    // }).catch((err) => {
    //   console.error('There was an error increasing quantity cart')
    // })
  }

  function handleCheckout() {
    http.createTransaction(user.id, grandTotal, cart)
      .then(res => {
        navigate(`/ordersuccess/${res.data.transactionId}`);
        clearCart()
      }).catch(err => {
        console.error(err);
      })
  }


  // This variable is needed to calculate the quantity
  // of items within the local storage shopping cart 
  // within the totalCartQty function below
  var cartSum = 0;

  function totalCartQty(cartSum) {

    for (let item of cart) {
      cartSum += item.quantity

    }
    return cartSum;
  }

  useEffect(() => {
    totalCartQty(cartSum)
    function handleResize() {

      setWidth(window.innerWidth)
    }

    console.log(width)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }



  }, [cart, cartSum]);

  return (
    <div className="shopping-cart-root"
      onSubmit={handleCheckout}>
      <h2 className="cart-header">
        Shopping Cart ({totalCartQty(cartSum)} items)
      </h2>
      {cart?.length === 0 ?
        <div>
          {cart?.length === 0 &&
            <div className="empty-cart-container">
              <p className="empty-cart-header">
                Oh...it seems like the cart is empty...
              </p>
              <div className="empty-cart-call-to-action">
                <p>Looking for shopping ideas?</p>
                <p> Check out our products</p>
                <div>
                  <Link to='/products'>
                    HERE
                  </Link>
                </div>
              </div>

            </div>}
        </div>
        :
        <div className="cart-container">

          <div className="shopping-cart-items">
            {cart.map((item) => (
              <CartItem key={item?.id}
                image={item.image}
                id={item?.id}
                price={item?.price}
                quantity={item?.quantity}
                name={item?.name}
                onIncreaseClicked={onIncreaseClicked}
                onDecreaseClicked={onDecreaseClicked}
                removeItem={removeItem}
              />
            ))}
          </div>

          {cart?.length !== 0 && (
            <div className="cart-summary-container">
              <h4 className="summary-header">Order Summary</h4>

              <div>
                <div>Sub Total</div>
                <div>${subTotal.toFixed(2)}</div>
              </div>
              <div className="taxes">
                <div>Tax</div>
                <div>{tax?.toFixed(2)}</div>
              </div>
              <div className="shipping">
                <div>Shipping Cost</div>
                <div>${shipping?.toFixed(2)}</div>
              </div>
              <div className="total-cost">
                <h4>Total Price</h4>
                <h4>${grandTotal?.toFixed(2)}</h4>
              </div>

              <button type="button"
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      }
    </div>
  )
}


function CartItem({ id, name, price, quantity, image, onIncreaseClicked, onDecreaseClicked, removeItem, width }) {

  return (
    <div key={id} className="item-row-container">

      <div className="cart-item-image-frame">
        <img src={image} />
      </div>

      <div className="item-name">
        <div>{name}</div>
        <div>${price?.toFixed(2)}</div>
      </div>

      <div className="quantity-btn">
        <button
          onClick={() => {
            if (quantity == 1) {
              removeItem(id)
            } else {
              onDecreaseClicked(id)
            }
          }}
          className="remove">
          -
        </button>
        <div className="item-quantity">
          <span>qty</span>  {quantity}
        </div>

        <button
          onClick={() => { onIncreaseClicked(id) }}
          className="add">
          +
        </button>
      </div>

      <div className="right-side">
        <div className="item-price">
          ${(price * quantity).toFixed(2)}
        </div>
        <button onClick={() => {
          removeItem(id)
        }}>
          <FontAwesomeIcon icon={faTrash} /> Remove
        </button>
      </div>
    </div>
  )
}

