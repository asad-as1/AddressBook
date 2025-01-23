import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Cookie from "cookies-js";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

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

  // Logout Function
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
        // Clear cookie and update state
        // Cookie.remove("user");
        Cookie.expire("user");
        setIsAuthenticated(false);

        // Success feedback
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirect to login page
        navigate("/login");
      }
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          AddressBook
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Nav Links */}
        <div className={`nav-content ${isMobileMenuOpen ? "show" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" >
                Home
              </Link>
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