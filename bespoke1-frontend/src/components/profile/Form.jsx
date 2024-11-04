import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Form = () => {
  const { userData, setUserData } = useAuth();
  const [form, setForm] = useState({
    name: userData.firstName || "",
    lastName: userData.lastName || "",
    username: userData.username || "",
    email: userData.email || "",
    password: "",
    confirmPassword: "", // New field for user confirmation
    image: userData.image || "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const resetFormData = () => {
    setForm({
      name: userData.firstName || "",
      lastName: userData.lastName || "",
      username: userData.username || "",
      email: userData.email || "",
      password: "",
      confirmPassword: "",
      image: userData.image || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: form.name,
            lastName: form.lastName,
            username: form.username,
            email: form.email,
            password: form.password,
            image: form.image,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setUserData(updatedUser.user);
      resetFormData();

      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
       <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {alertVisible && (
          <div className="alert alert-success">
            User data updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-4">
            <label className="text-lg">First Name</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <label className="text-lg">Last Name</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <label className="text-lg">Username</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
            />
          </div>
          </div>
          <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <label className="text-lg">Email</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>
          </div>
          <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <label className="text-lg">Password</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
</div>
          <div className="flex flex-col py-4">
            <label className="text-lg">Confirm Password</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              required
            />
          </div>
          <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col py-4">
            <label className="text-lg">Photo</label>
            <input
              className="border border-gray-300 p-2 rounded-md"
              name="image"
              placeholder="Enter image URL (Optional)"
              onChange={handleChange}
              type="text"
            />
          </div>
          </div>
        <div className="max-w-lg w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col py-4">
            <button
              type="submit"
              className="btn btn-success border-gray-300 p-2 rounded-md"
              >
              Update
            </button>
          </div>
              </div>
        </form>
      </div>
    </>
  );
};

export default Form;
