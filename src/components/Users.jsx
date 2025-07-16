import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(3);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/showusers?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
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
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users`;
      const result = await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setError("User added succesfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      ...form,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/users/${editId}`;
      const result = await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div>
      <h2>User Management</h2>
      {error}
      <div>
        <form ref={frmRef}>
          <input
            name="firstName"
            value={form.firstName}
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            value={form.email}
            type="text"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            value={form.password}
            type="password"
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
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {/* <input
            name="role"
            value={form.role}
            type="text"
            onChange={handleChange}
            placeholder="Role"
          /> */}

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
      <div>
        <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
        <button onClick={() => fetchUsers()}>Search</button>
      </div>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Role</th>
            </tr>
          </thead>
          {users.map((value) => (
            <tbody key={value._id}>
              <tr>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <button onClick={() => handleEdit(value)}>Edit</button>
                  <button onClick={() => handleDelete(value._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        Page {page} of {totalPages}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}