import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id) => {
    setCart(prev =>
      prev.map(product =>
        product._id === id ? { ...product, qty: (product.qty || 0) + 1 } : product
      )
    );
  };

  const decrement = (id) => {
    setCart(prev => {
      const product = prev.find(p => p._id === id);
      if (!product) return prev;

      // If qty is 1, remove the item; otherwise decrement
      if ((product.qty || 0) <= 1) {
        return prev.filter(p => p._id !== id);
      } else {
        return prev.map(p =>
          p._id === id ? { ...p, qty: p.qty - 1 } : p
        );
      }
    });
  };

  // Optional: explicit remove function
  const removeItem = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  useEffect(() => {
    const total = cart.reduce((sum, value) => {
      const qty = Number(value.qty) || 0;
      const price = Number(value.price) || 0;
      return sum + qty * price;
    }, 0);
    setOrderValue(total);
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart, // consider sending only items with qty > 0
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {error && <p className="error">{error}</p>}

      <ul className="cart-list">
        {cart &&
          cart.map(
            (item) =>
              (item.qty ?? 0) > 0 && (
                <li key={item._id} className="cart-item">
                  <div className="item-details">
                    <p>
                      <strong>{item.productName}</strong>
                    </p>
                    <p>₹{item.price} x {item.qty} = ₹{item.price * item.qty}</p>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => decrement(item._id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increment(item._id)}>+</button>
                    {/* optional quick remove */}
                    <button onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </li>
              )
          )}
      </ul>

      <h3 className="total">Total: ₹{orderValue}</h3>

      <div className="action-button">
        {user?.token ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </div>
    </div>
  );
}
