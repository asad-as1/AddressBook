import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewContact.css";
import Cookie from "cookies-js";
import Swal from "sweetalert2";

const NewContact = ({ contactDetails }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!!contactDetails); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
  });

  const token = Cookie.get("user");

  useEffect(() => {
    if (contactDetails) {
      setFormData({
        firstName: contactDetails.firstName || "",
        lastName: contactDetails.lastName || "",
        phone: contactDetails.phone || "",
        address: contactDetails.address || "",
        email: contactDetails.email || "",
      });
    }
  }, [contactDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); 
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue.slice(0, 10), 
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValidPhone = /^[0-9]{10}$/.test(formData.phone);
    if (!isValidPhone) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number must be exactly 10 digits and numeric.",
        confirmButtonText: "OK",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(
          `${import.meta.env.VITE_URL}contact/updatecontact/${contactDetails._id}`,
          { formData, token }
        );

        Swal.fire({
          icon: "success",
          title: "Contact Updated",
          text: "Your contact has been updated successfully!",
          confirmButtonText: "OK",
        });
        navigate("/contacts");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}contact/addcontact`,
          { formData, token }
        );

        Swal.fire({
          icon: "success",
          title: "Contact Created",
          text: "Your contact has been created successfully!",
          confirmButtonText: "OK",
        });

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          address: "",
          email: "",
        });
      }
    } catch (error) {
      console.error(
        isEditing ? "Error updating contact:" : "Error creating contact:",
        error.response?.data || error.message
      );

      Swal.fire({
        icon: "error",
        title: isEditing
          ? "Failed to Update Contact"
          : "Failed to Create Contact",
        text: error.response?.data?.message || "An error occurred. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.phone !== "" &&
    formData.email.trim() !== "" &&
    formData.address.trim() !== "";

  return (
    <div className="contact-page">
      <div className="background-shapes">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="contact-container">
        <div className="contact-card">
          <div className="card-header">
            <h2>{isEditing ? "Edit Contact" : "New Contact"}</h2>
            <p>Fill out all fields to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name (Optional)</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn cancel-btn"
                onClick={() =>
                  setFormData({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    address: "",
                    email: "",
                  })
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn submit-btn ${
                  !isFormValid || isSubmitting ? "disabled" : ""
                }`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewContact;
