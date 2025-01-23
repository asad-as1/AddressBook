import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewContact from "../NewContact/NewContact";
import Cookie from "cookies-js";


const EditContact = () => {
  const { id } = useParams(); 
  const [contactDetails, setContactDetails] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const token = Cookie.get("user");

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}contact/${id}`,
          {token}
        );
        // console.log(response.data.contact)
        setContactDetails(response.data.contact); 
        setLoading(false); 
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
