import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Login from "../../Pages/Login/Login"
import SignUp from "../../Pages/Signup/SignUp"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to='/' className="nav-link">AddressBook</Link> 
        </div>
        
        <div className="nav-links">
          <Link to='/' className="nav-link">
            Home
          </Link>

          <Link to='/login' className="nav-link">
            Login
          </Link>
          <Link to='/signup' className="nav-link">
            Sign Up
          </Link>
          
          <Link to='/contacts' className="nav-link">
            Contacts
          </Link>
          <Link to='/newcontact' className="nav-link">
            New Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;