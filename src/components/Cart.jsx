// import React from 'react'

// export default function Cart() {
//   return (
//     <div>Cart</div>
//   )
// }

import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const Navigate = useNavigate()
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  return (
    <div>
      <h2>My Cart</h2>
      {cart &&
        cart.map(
          (value) =>
            value.qty > 0 && (
              <li key={value._id}>
                {value.productName}-{value.price}-
                <button onClick={() => decrement(value._id, value.qty)}>
                  -
                </button>
                {value.qty}
                <button onClick={() => increment(value._id, value.qty)}>
                  +
                </button>
                -{value.price * value.qty}
              </li>
            )
        )}
      <h5>Order Value:{orderValue}</h5>
      <p>
        {user?.token ? (
          <button>Place Order</button>
        ) : (
          <button onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}