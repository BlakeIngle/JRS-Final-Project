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

  let user = ls.getUser();
  let subTotal = calculateTotalPrice(cart);
  const tax = .07 * subTotal;
  const shipping = 15.00;
  const grandTotal = subTotal + tax + shipping;

  /**
   * 
   * @param {array} cart 
   * @returns the total price of
   * the cart based on the qty and 
   * individual items price
   */
  function calculateTotalPrice(cart) {
    let sum = 0;

    // calculate sum of individual price of every item
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i]?.price * cart[i]?.quantity;
    }
    return sum;
  }

  /**
   * 
   * @param {string} itemId 
   * decreases the qty of an item
   * based on the individual items id
   * within the local cart
   */
  function onDecreaseClicked(itemId) {
    decreaseQty(itemId)
  }

  /**
   * 
   * @param {string} itemId 
   * increases the qty of an item
   * based on the individual items id
   * within the local cart
   */
  function onIncreaseClicked(itemId) {
    increaseQty(itemId)
    // .then((cart) => {
    //   decreaseQty(cart.item);
    // }).catch((err) => {
    //   console.error('There was an error increasing quantity cart')
    // })
  }

  /**
   * attempt checkout then navigate 
   * to the order success page and
   * clear the cart if checkout 
   * was successful
   */
  function handleCheckout() {
    http.createTransaction(user.id, grandTotal, cart)
      .then(res => {
        navigate(`/ordersuccess/${res.data.transactionId}`);
        clearCart();
      }).catch(err => {
        console.error(err);
      })
  }


  /**
   * This variable is needed to calculate the quantity
   * of items within the local storage shopping cart 
   * within the totalCartQty function below
   */
  var cartSum = 0;

  /**
   * 
   * @param {number} cartSum 
   * @returns the total number
   * of items in the local cart
   */
  function totalCartQty(cartSum) {

    for (let item of cart) {
      cartSum += item.quantity

    }
    return cartSum;
  }

  /**
   * on initialization, calculate the total
   * qty of items in the local cart and set width of
   * the screen size. re-render when the cart updates
   * or the sum of the cart changes
   */
  useEffect(() => {
    totalCartQty(cartSum)
    function handleResize() {

      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [cart, cartSum]);

  return (
    <div className="shopping-cart-root"
      onSubmit={handleCheckout}>
      <h2 className="cart-header">
        Shopping&nbsp;Cart ({totalCartQty(cartSum)} items)
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
                <div>${(subTotal)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="taxes">
                <div>Tax</div>
                <div>${(tax)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              <div className="shipping">
                <div>Shipping Cost</div>
                <div>${shipping?.toFixed(2)}</div>
              </div>
              <div className="total-cost">
                <h4>Total<br/>Price</h4>
                <h4>${(grandTotal)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
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

/**
 * 
 * @param {string, string, number, number, string, 
 * function, function, function} param0 
 * @returns a cart item component in the form of a cart
 * item "card"
 */
function CartItem({ id, name, price, quantity, image, onIncreaseClicked, onDecreaseClicked, removeItem }) {

  return (
    <div key={id} className="item-row-container">

      <div className="cart-item-image-frame">
        <img src={image} />
      </div>

      <div className="item-name">
        <div><b>{name}</b></div>
        <div>${(price)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
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
        <b>${(price * quantity)?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b>
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

