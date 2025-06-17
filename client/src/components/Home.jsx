import React from "react";
import baseURL from "../axiosintance.js";
import { useEffect } from "react";
const Home = () => {
  const [users, setUsers] = React.useState([]);
  const [form, setForm] = React.useState({ username: "", password: "" });
  const [editIndex, setEditIndex] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      handleUpdate(editIndex);
    } else {
      try {
        const da = await baseURL.post("/add", form);
        if (da.data?.success) {
          alert("data added successfully");
          setForm({ username: "", password: "" });
          fetchalldata();
        } else {
          alert("error in adding data");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const fetchalldata = async () => {
    try {
      const alldata = await baseURL.get("/list", form);
      setUsers(alldata.data.booklist);
    } catch (error) {
      console.log("error in fatch", error.message);
    }
  };

  const handleDelete = async (idx) => {
    const { data } = await baseURL.post("/del", { Id: idx });

    if (data?.success) {
      alert(data?.message);
      fetchalldata();
    } else {
      alert("error");
    }
  };

  const handleEdit = async (id, idx) => {
    setForm(users[idx]);
    setEditIndex(id);
  };
  
  const handleUpdate = async (id) => {
    const { data } = await baseURL.put("/update", { ...form, Id: id });

    if (data?.success) {
      setForm({ username: "", password: "" });
      fetchalldata();
      setEditIndex(null);
      
      alert(data?.message);
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchalldata();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-2 sm:px-4">
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-purple-700">
          SafePass App
        </h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label
              htmlFor="username"
              className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-2 sm:mb-0"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label
              htmlFor="password"
              className="w-full sm:w-1/4 text-sm font-medium text-gray-700 mb-2 sm:mb-0"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-600 text-white px-8 py-2 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
            >
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {/* Users List */}
        <div className="mt-8 sm:mt-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-600">
            User List
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm sm:text-base">
              <thead>
                <tr>
                  <th className="py-2 px-2 sm:px-4 border-b">Username</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Password</th>
                  <th className="py-2 px-2 sm:px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-400">
                      No users added yet.
                    </td>
                  </tr>
                ) : (
                  users.slice().reverse().map((user, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-2 sm:px-4 border-b break-all">{user.username}</td>
                      <td className="py-2 px-2 sm:px-4 border-b break-all">{user.password}</td>
                      <td className="py-2 px-2 sm:px-4 border-b flex flex-col sm:flex-row gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(user._id, idx)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
