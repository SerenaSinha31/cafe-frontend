import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function LastUpdate({ dt }) {
  const updatedAt = new Date(dt);
  const diffInMs = Date.now() - updatedAt.getTime();
  const diffInDays = Math.ceil(diffInMs / 60000 / (60 * 24));
  return diffInDays + "d";
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const formRef = useRef();

  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setLoading("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setLoading();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setError();
    setForm(product);
    setEditId(product._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = formRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    const url = `${API_URL}/api/products/${editId}`;
    await axios.patch(url, form);
    setError("Product updated successfully.");
    resetForm();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = formRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    const url = `${API_URL}/api/products`;
    await axios.post(url, form);
    setError("New product added successfully.");
    resetForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
    setEditId(null);
    fetchProducts();
  };

  const handleSearch = () => {
    setPage(1);
    setTotalPages(1);
    fetchProducts();
  };

  return (
    <div>
      <div>
        <h2>Products Management</h2>
        {error && <p>{error}</p>}
        <div>
          <form ref={formRef}>
            <input
              type="text"
              name="productName"
              value={form.productName}
              placeholder="Product Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              value={form.price}
              placeholder="Price"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="imgUrl"
              value={form.imgUrl}
              placeholder="Image URL"
              onChange={handleChange}
              required
            />
            {editId ? (
              <>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button onClick={handleAdd}>Add</button>
            )}
          </form>
        </div>
        <br />
        <div>
          <input
            type="text"
            placeholder="Search Product Name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <br />
        {loading && <p>{loading}</p>}
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <img src={product.imgUrl} alt="product" width="50" />
                    </td>
                    <td>
                      <LastUpdate dt={product.updatedAt} />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage(Math.max(page - 1, 1))}
            >
              Previous
            </button>
            Page {page} of {totalPages}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(Math.min(page + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}