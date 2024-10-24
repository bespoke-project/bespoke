import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "garden"
  );

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
        <div className="flex-1">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleChange} />
            {/* Symbol für dunkles Theme (Mond) */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.75 12.07c0-5.4-4.38-9.77-9.77-9.77-.72 0-1.44.08-2.14.24 3.88 1.45 6.7 5.21 6.7 9.53s-2.82 8.08-6.7 9.53c.7.16 1.42.24 2.14.24 5.39 0 9.77-4.37 9.77-9.77z" />
            </svg>
            {/* Neues Symbol für helles Theme */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="swap-off w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </label>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/logout" >Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
