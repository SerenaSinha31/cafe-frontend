import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LastUpdate({dt}) {
  const updatedAt = new Date(dt);
  const diffInMs = Date.now() - updatedAt.getTime();
  const diffInDays = Math.ceil(diffInMs / 60000 / (60 * 24));
  return diffInDays + "d";
}

export default function Users1() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const formRef = useRef();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
      setLoading("Loading...");
      const url = `${API_URL}/api/users/showusers?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setLoading();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      const result = await axios.delete(url);
      setError("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setError();
    setForm(user);
    setEditId(user._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = formRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    const url = `${API_URL}/api/users/${editId}`;
    const result = await axios.patch(url, form);
    setError("User details modified successfully.");
    resetForm();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = formRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    const url = `${API_URL}/api/users`;
    const result = await axios.post(url, form);
    setError("New user added successfully.");
    resetForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
    setEditId(null);
    fetchUsers();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (editId === "edit") {
        const url = `${API_URL}/api/users/${editId}`;
        const result = await axios.patch(url, form);
        setError("User details modified successfully.");
      } else if (editId === "add") {
        const url = `${API_URL}/api/users`;
        const result = await axios.post(url, form);
        setError("New user added successfully.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  const handleSearch = () => {
    setPage(1);
    setTotalPages(1);
    fetchUsers();
  };
  return (
    <div>
      <div>
        <h2>User Management</h2>
        {error}
        <div>
          <form ref={formRef}>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="New Password"
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={form.role}
              required
              onChange={handleChange}
            >
              <option value="">--Select Role --</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              name="role"
              value={form.role}
              placeholder="Role"
              onChange={handleChange}
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
            placeholder="First Name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <br />
        {loading}
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email address</th>
                <th>Role</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            {users &&
              users.map((user) => (
                <tbody key={user._id}>
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <LastUpdate dt={user.updatedAt} />
                    </td>
                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            <tfoot></tfoot>
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