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
    confirmPassword: "",
    image: userData.image || "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="max-w-2xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {alertVisible && (
          <div className="alert alert-success mb-4">
            User data updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Field */}
          <div className="flex flex-col">
            <label className="text-lg">First Name</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your first name"
            />
          </div>
          {/* Last Name Field */}
          <div className="flex flex-col">
            <label className="text-lg">Last Name</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Enter your last name"
            />
          </div>
          {/* Username Field */}
          <div className="flex flex-col">
            <label className="text-lg">Username</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter your username"
            />
          </div>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-lg">Email</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Field */}
          <div className="flex flex-col relative">
            <label className="text-lg">Password</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Confirm Password Field */}
          <div className="flex flex-col relative">
            <label className="text-lg">Confirm Password</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-9"
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Photo Field */}
          <div className="flex flex-col">
            <label className="text-lg">Photo</label>
            <input
              className="border border-gray-300 p-2 rounded-md w-full"
              name="image"
              placeholder="Enter image URL (Optional)"
              onChange={handleChange}
              type="text"
              value={form.image}
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-success border-gray-300 p-2 rounded-md w-full sm:w-auto"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
