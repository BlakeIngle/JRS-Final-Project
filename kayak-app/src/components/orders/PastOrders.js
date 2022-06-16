import React, { useEffect, useState } from 'react'
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import '../orders/PastOrders.css'


export default function PastOrders() {

  const http = useApi();

  const ls = useLocalStorage();
  let user = ls.getUser();

  const [transactions, setTransactions] = useState([]);

  function getAllTransactionsByUserId() {

    http.getAllTransactionsByUserId(user.id)
      .then((response) => {

        console.log(response.data)
        setTransactions(response.data.transactions);
      })
      .catch((err) => {
        console.log("error getting all", err)
      })
  }

  useEffect(() => {
    getAllTransactionsByUserId();
  }, []);

  return (
    <div className="past-orders-root">

      <h1>Order History</h1>
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
  )

}
