

import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div>
        <Link to="/admin">Users</Link>-
        <Link to="/admin/products">Products</Link>-
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}