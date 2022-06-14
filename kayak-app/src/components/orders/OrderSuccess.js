import React, { useState, useEffect } from 'react'
import '../orders/OrderSuccess.css'
import { useApi } from '../../services/axios.service';
import { useParams } from 'react-router-dom';

export default function OrderSuccess() {

  let { transactionId } = useParams()
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const http = useApi();

  function getItemsPurchasedByTransactionId() {
    http.getItemsPurchasedByTransactionId(transactionId)
      .then((response) => {
        console.log("you're in the order confirm page server response ")
        console.log(response)
        setItems(response.data.items);
      })
      .catch(() => {
        console.log("error getting all")
      })
  }

  function getTransactionData() {
    http.getTransactionById(transactionId)
      .then((response) => {
        console.log(response)
        response.data.transaction.date = new Date(response.data.transaction.date);
        setOrder(response.data.transaction);
      })
      .catch(() => {
        console.log("error getting transaction data")
      })
  }

  useEffect(() => {
    console.log("im in the useEffect function")
    getTransactionData();
    getItemsPurchasedByTransactionId();
  }, []);

  useEffect(() => {
    console.log(order)
  }, [order])

  return (
    <div className="order-root">
      <h1 className="order-status-success">
        Order
      </h1>
      <div className='order-page-content'>
        <div className="order-status-root">

          <div className="order-header">
            <span className="date">
              ORDER DATE:&nbsp; <b>
                {order.date ? order.date.toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}</b>
            </span>

            <span className="grand-total">
              ORDER TOTAL: <h2>
              ${order?.total?.toFixed(2)} </h2>
            </span>
          </div>

          <div className="order-status-success">
            {transactionId == order.id
              ? ''
              : `Order '${transactionId}' Doesnt exist`}
          </div>

          <div className="order-number">
            {order.id
              ? <span>Order #: <b>{order.id}</b></span>
              : <b>Your order was not succesful, please try again</b>}
          </div>

        </div>

        {items.map((item) => (
          <div className="order-detail-root "
            key={item.id}>
            <div className="order-display">

              <div className="product-image-frame">
                <img src={item.image} />
              </div>

              <div className="order-data-root">
                {/* <div className="order-display-id"> Product ID: {item.id}</div> */}
                <div className="order-display-name"> Name: <span className="bold">{item.name} </span></div>
                <div className="order-display-brand"> Brand:  <span className="bold">{item.brand}</span></div>
                <div className="order-display-color"> Color:<span className="bold"> {item.color}</span></div>
                {/* <div className="order-display-total"> Total Price: ${item.total} </div> */}
              </div>

              <div className="order-display-quantity">
                Qty
                <div>
                  {item.quantity}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )

}
