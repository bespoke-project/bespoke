import { useState } from "react";
import Swal from "sweetalert2";
import SignUpModal from "./SignUpModal";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LogForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkUser } = useAuth();
  const navigate = useNavigate(); // Initialisiere useNavigate

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Input Error",
        text: "Please fill in both Email and Password fields.",
      });
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          await checkUser();
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            // Navigiere zu /home nach erfolgreichem Login
            navigate("/home");
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.response.data.message || "Incorrect email or password.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please check your connection and try again.",
          });
        }
      }
    }
  };

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-2xl p-5 ">
        {/* Ersetze den Text durch das Logo
        <div className="flex justify-center pb-6">
          <img src={logo} alt="Bespoke Logo" className="h-20 w-auto" />
        </div> */}
                <div className="flex-none">
          <img
            src="/Bespoke!Logo.webp" // Logo aus dem public Ordner
            alt="Logo"
            className="h-20 w-auto mx-auto m-10"
          />
        </div>
        <h2 className="text-xl text-center font-semibold">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p className="pt-4 text-center">
              No account?{" "}
              <span
                onClick={handleModalOpen}
                className="text-blue-500 cursor-pointer"
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </div>

      {showModal && <SignUpModal onClose={handleModalClose} />}
    </>
  );
};

export default LogForm;
