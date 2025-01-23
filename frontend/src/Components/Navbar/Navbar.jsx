import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "cookies-js";
import axios from "axios";
import Swal from "sweetalert2"; 
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  const user = Cookie.get("user");
  const BACKEND_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}user/profile`, {
          token: user,
        });
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
      }
    };

    if (user) {
      checkAuth();
    } else {
      setIsAuthenticated(false);
    }
  }, [user, BACKEND_URL]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookie.expire("user");
        setIsAuthenticated(false);
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          AddressBook
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <div
          className={`nav-content ${isMobileMenuOpen ? "show" : ""}`}
          ref={menuRef}
        >
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/contacts">Contacts</Link>
                </li>
                <li>
                  <Link to="/newcontact">New Contact</Link>
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;