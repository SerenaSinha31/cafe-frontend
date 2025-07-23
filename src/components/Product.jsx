// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AppContext } from "../App";
// import './Product.css'; 
// export default function Product() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState();
//   const { user, cart, setCart } = useContext(AppContext);
//   const fetchProducts = async () => {
//     try {
//       const url = `${API_URL}/api/products/all`;
//       const result = await axios.get(url);
//       setProducts(result.data.products);
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const addToCart = (product) => {
//     const found = cart.find((item) => item._id === product._id);
//     if (!found) {
//       product.qty = 1;
//       setCart([...cart, product]);
//     }
//   };
//   return (
//     <div>
//       {products &&
//         products.map((product) => (
//           <div key={product._id}>
//             <img src={product.imgUrl} width={100}/>
//             <h3>{product.productName}</h3>
//             <p>{product.description}</p>
//             <h4>{product.price}</h4>
//             <button onClick={() => addToCart(product)}>Add to Cart</button>
//           </div>
//         ))}
//     </div>
//   );
// }
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { FaShoppingCart } from "react-icons/fa";
import "./Product.css";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [error, setError] = useState();
  const { cart, setCart } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products/all?limit=1000`);
        console.log("Fetched products:", data.products);
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading products.");
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(products.length, prev + 4));
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>

      <p style={{ textAlign: "center" }}>
        Showing {Math.min(visibleCount, products.length)} of {products.length} products
      </p>

      <div className="product-grid">
        {products.slice(0, visibleCount).map((product, index) => {
          console.log("Rendering product:", index + 1, product.productName);
          return (
            <div
              className="product-card"
              key={product._id}
              style={{ border: "2px solid red" }} // Optional: for debug
            >
              <img
                src={product.imgUrl}
                alt={product.productName}
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <h4>₹{product.price}</h4>
                <button className="cart-btn" onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < products.length && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

