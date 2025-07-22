// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { AppContext } from "../App";
// export default function Order() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const { user } = useContext(AppContext);
//   const [error, setError] = useState();
//   const [orders, setOrders] = useState([]);
//   const fetchOrders = async () => {
//     try {
//       const url = `${API_URL}/api/orders/${user.email}`;
//       const result = await axios.get(url);
//       setOrders(result.data);
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <h3>My Orders</h3>
//       {orders &&
//         orders.map((order) => (
//           <div>
//             <p>OrderId:{order._id}</p>
//             <p>Order Value: {order.orderValue} </p>
//             <p>Status:{order.status}</p>
//             <table border="1">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               {order.items.map((item) => (
//                 <tbody key={item._id}>
//                   <tr>
//                     <td>{item.productName}</td>
//                     <td>{item.price}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.qty * item.price}</td>
//                   </tr>
//                 </tbody>
//               ))}
//             </table>
//             <hr />
//           </div>
//         ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import './Order.css';

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h3>My Orders</h3>
      {orders &&
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Value:</strong> ₹{order.orderValue}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <td>{item.qty}</td>
                    <td>₹{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        ))}
    </div>
  );
}
