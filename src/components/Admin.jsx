

// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import './Admin.css';
// export default function Admin() {
//   return (
//     <div>
//       <div>
//         <Link to="/admin">Users</Link>-
//         <Link to="/admin/products">Products</Link>-
//         <Link to="/admin/orders">Orders</Link>
//       </div>
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Link, Outlet } from "react-router-dom";
import './Admin.css';

export default function Admin() {
  return (
    <div>
      <div className="admin-nav">
        <Link to="/admin">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
