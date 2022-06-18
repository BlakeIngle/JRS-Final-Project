import React, { useEffect, useState } from 'react'
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import '../orders/PastOrders.css'


export default function PastOrders() {

  const [transactions, setTransactions] = useState([]);
  const http = useApi();
  const ls = useLocalStorage();
  let user = ls.getUser();

  /**
   * Gets all transactions based on the 
   * users id and returns an array of ids
   */
  function getAllTransactionsByUserId() {

    http.getAllTransactionsByUserId(user.id)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((err) => {
        console.error("error getting all", err)
      })
  }


/**
 * on initialization, render the page
 * with all transactions with the users
 * ID
 */
  useEffect(() => {
    getAllTransactionsByUserId();
  }, []);

  return (
    <div className="past-orders-root">

      <h1>Order History</h1>
      
      <div className="order-history-container">
        <table>
          <tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Total</th>
          </tr>

          {transactions.map((transaction) => (
            <tr
              className="transaction"
              key={transaction.id}
            >
              <td>
                <a href={`/ordersuccess/${transaction.id}`}>
                  {transaction.id}
                </a>
              </td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>${transaction.total.toFixed(2)}</td>
            </tr>
          ))}

        </table>
      </div>
    </div>
  )

}
