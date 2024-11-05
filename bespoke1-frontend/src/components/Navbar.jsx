import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importiere useLocation für die aktuelle Route
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "garden"
  );
  const { userData } = useAuth();
  const [isCookieAvailable, setIsCookieAvailable] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getCookieValue = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  // Funktion zum Löschen eines Cookies
  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
    setIsCookieAvailable(false);
    navigate("/");
  };

  useEffect(() => {
    const token = getCookieValue("token");

    if (token) {
      setIsCookieAvailable(true);
    } else {
      setIsCookieAvailable(false);
      navigate("/");
    }
  }, [userData]);

  const handleChange = (e) => {
    setTheme(e.target.checked ? "dark" : "garden");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="navbar bg-base-300">
        {/* Links - Theme-Toggle und optionale Begrüßung */}
        <div className="flex-1 flex items-center">
          <label className="swap swap-rotate mr-4">
            <input
              type="checkbox"
              onChange={handleChange}
              checked={theme === "dark"}
            />
            {/* Sonne für dunkles Theme */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="swap-on size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            {/* Mond für helles Theme */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="swap-off size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </label>
          {isCookieAvailable && userData && (
            <div className="text-xl font-semibold">
              Welcome {userData.firstName}
            </div>
          )}
        </div>
        {/* Logo nur anzeigen, wenn die aktuelle Route nicht "/" ist */}
        {location.pathname !== "/" && (
          <div className="flex-none">
            <img
              src="/Bespoke!Logo.webp" // Logo aus dem public Ordner
              alt="Logo"
              className="h-20 w-auto mx-auto"
            />
          </div>
        )}
        <div className="flex-1 flex justify-end">
          <ul className="menu menu-horizontal px-1">
            {isCookieAvailable ? (
              <>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/Profile">Profile</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <button
                    onClick={() => deleteCookie("token")}
                    className="btn btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li></li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
