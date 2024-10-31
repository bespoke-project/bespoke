import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import logo from "/Users/gabriel/WBS/myWDG18/Final-Project/git-bespoke/bespoke1-frontend/src/components/graphics/logo.png";

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
      <div className="navbar bg-base-300 max-h-8">
        <div className="flex-1">
          <label className="swap swap-rotate">
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
        </div>
        {/* Mittig zentriertes Logo */}
        {/* <div className="flex-none">
          <img
            src={logo}
            alt="Logo"
            className="h-20
           w-auto mx-auto"
          />
        </div> */}
        <div className="flex-1 flex justify-end">
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
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
