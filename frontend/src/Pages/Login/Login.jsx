import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookie from "cookies-js";
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export const login = async (data, navigate, setApiError, from) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_URL}user/login`, data);
    if (res?.status === 200) {
      Cookie.set('user', res.data.token, {
        httpOnly: true,
        secure: true,
      });

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You are now logged in!',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(from || '/'); 
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.response?.data?.message || 'Login failed. Please try again.',
    });
    setApiError(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); 
  const location = useLocation(); 
  const from = location.state?.from || "/"; 

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setIsLoading(true); 
      setApiError(''); 

      await login(formData, navigate, setApiError, from); 
      setIsLoading(false); 
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p className="subtitle">Please enter your credentials to login</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group password-field">
            <input
              type={showPassword ? 'text' : 'password'} 
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            <span className="password-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {apiError && <p className="error-message">{apiError}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
