import React, { useState, useEffect } from 'react'
import '../orders/OrderSuccess.css'
import { useApi } from '../../services/axios.service';
import { useParams } from 'react-router-dom';

export default function OrderSuccess() {

  let { transactionId } = useParams()
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const http = useApi();

  /**
   * This functions gets all products purchased by 
   * transaction id and returns an array of product
   * ojects
   */
  function getItemsPurchasedByTransactionId() {
    http.getItemsPurchasedByTransactionId(transactionId)
      .then((response) => {
        setItems(response.data.items);
      })
      .catch(() => {
        console.error("error getting all")
      })
  }

  /**
   * This function gets a single transaction by
   * a single transaction Id and returns 
   * an array of products purchased by transaction id
   */
  function getTransactionData() {
    http.getTransactionById(transactionId)
      .then((response) => {
        response.data.transaction.date = new Date(response.data.transaction.date);
        setOrder(response.data.transaction);
      })
      .catch(() => {
        console.error("error getting transaction data")
      })
  }

  /**
   * on initialization, gets all transations with
   * the transaction id, then gets all items
   * purchased with that transaction id
   * and renders the page with those purchased
   * items
   */
  useEffect(() => {
    getTransactionData();
    getItemsPurchasedByTransactionId();
  }, [order]);

  return (
    <div className="order-root">
      <h1 className="order-status-success">
        Invoice
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
              ${(order?.total)?.toLocaleString(undefined, { maximumFractionDigits: 2 })} </h2>
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
          <div className="order-detail-root"
            key={item.id}>
            <div className="order-display">

              <div className="product-image-frame">
                <img src={item.image} />
              </div>

              <div className="order-data-root">
                <div className="order-display-name"> Name: <span className="bold">{item.name} </span></div>
                <div className="order-display-brand"> Brand:  <span className="bold">{item.brand}</span></div>
                <div className="order-display-color"> Color:<span className="bold"> {item.color}</span></div>
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
