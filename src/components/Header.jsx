import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div>
      <h1>MERN Frontend</h1>
      <Link to="/">Home</Link>-<Link to="/cart">MyCart</Link>-
      <Link to="/order">MyOrder</Link>
      <Link to="/admin">Admin</Link>
      -{user?.role === "admin" && <Link to="/admin">Admin</Link>}
      
      {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link> }


    </div>
  );
}