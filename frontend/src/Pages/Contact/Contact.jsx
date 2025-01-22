import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import Cookie from "cookies-js";
import './Contact.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookie.get("user");

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}contact/getcontact`,
          { token }
        );
        if (response.data.contacts.length === 0) {
          setError('No contacts available.');
        } else {
          setContacts(response.data.contacts);
        }
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No contacts available.');
        } else {
          setError('Failed to fetch contacts. Please try again later.');
        }
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, []);
  

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortedAndFilteredContacts = () => {
    let filteredContacts = contacts?.filter((contact) =>
      Object.values(contact).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortField) {
      filteredContacts.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredContacts;
  };

  
  //TODO

  // const handleDelete = async (id) => {
  //   if (window.confirm('Are you sure you want to delete this contact?')) {
  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_URL}contact/delet`,
  //         { token }
  //       );
  //       setContacts(contacts.filter((contact) => contact._id !== id));
  //     } catch (err) {
  //       alert('Failed to delete contact. Please try again later.');
  //     }
  //   }
  // };


  //TODO

  // const handleUpdate = (id) => {
  //   alert(`Update feature for contact ID ${id} is not implemented yet.`);
  // };


  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="contacts-table-container">
      <div className="table-header">
        <h2>Contacts</h2>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      <div className="table-responsive">
        <table className="contacts-table">
          <thead>
            <tr>
              {['firstName', 'lastName', 'phone', 'address'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`sortable ${sortField === field ? 'active' : ''}`}
                >
                  <div className="th-content">
                    <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                    <span className="sort-icon">{getSortIcon(field)}</span>
                  </div>
                </th>
              ))}
              <th className="action-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getSortedAndFilteredContacts().map((contact) => (
              <tr key={contact._id}>
                <td data-label="First Name">{contact.firstName}</td>
                <td data-label="Last Name">{contact.lastName}</td>
                <td data-label="Phone" className="highlight-phone">
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </td>
                <td data-label="Address">{contact.address}</td>
                <td className="action-buttons">
                  <button
                    className="btn update-button"
                    onClick={() => handleUpdate(contact._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn delete-button"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {getSortedAndFilteredContacts().length === 0 && (
          <div className="no-results">No contacts found matching your search.</div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
