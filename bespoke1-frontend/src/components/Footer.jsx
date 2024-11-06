import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Footer = () => {
  const { userData } = useAuth();
  const location = useLocation();
  const isCookieAvailable = !!document.cookie.match(
    new RegExp("(^| )" + "token" + "=([^;]+)")
  );

  if (!isCookieAvailable || location.pathname === "/") {
    return null;
  }

  return (
    <footer className="footer p-5 bg-base-200 mt-16 w-full text-base text-[#67817d]">
      <div className="flex justify-around w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center">
          <span className="footer-title">Pages</span>
          <Link
            to="/Home"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Home
          </Link>
          <Link
            to="/Profile"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Profile
          </Link>
          <Link
            to="/Search"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Search
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <span className="footer-title">Company</span>
          <Link
            to="/about"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            About us
          </Link>
          <Link
            to="/contact"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Contact
          </Link>
          <Link
            to="/jobs"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Jobs
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <span className="footer-title">Legal</span>
          <Link
            to="/terms"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Terms of use
          </Link>
          <Link
            to="/privacy"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Privacy policy
          </Link>
          <Link
            to="/cookie"
            className="transition transform duration-200 hover:bg-[#b0c4c0] hover:text-white hover:shadow-md hover:scale-95 py-2 px-4 rounded no-underline"
          >
            Cookie policy
          </Link>
        </div>

        {/* Logo */}
        {location.pathname !== "/" && (
          <div className="flex items-center pt-7">
            <img
              src="/Bespoke!Logo.webp" // Logo aus dem public Ordner
              alt="Logo"
              className="h-20 w-auto"
            />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
