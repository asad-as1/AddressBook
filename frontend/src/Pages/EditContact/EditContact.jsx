import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewContact from "../NewContact/NewContact";
import Cookie from "cookies-js";


const EditContact = () => {
  const { id } = useParams(); // Extract contactId from the URL parameters
  const [contactDetails, setContactDetails] = useState(null); // State to hold contact details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const token = Cookie.get("user");

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        // Make an API request to fetch the contact details by ID
        const response = await axios.post(
          `${import.meta.env.VITE_URL}contact/${id}`,
          {token}
        );
        // console.log(response.data.contact)
        setContactDetails(response.data.contact); // Update state with contact details
        setLoading(false); // Mark loading as complete
      } catch (err) {
        console.error("Error fetching contact details:", err.message);
        setError("Failed to fetch contact details.");
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NewContact contactDetails={contactDetails} />
    </div>
  );
};

export default EditContact;
