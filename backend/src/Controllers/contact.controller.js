const Contact = require("../models/contacts"); // Import your Contact model
const User = require("../models/user"); // Import your User model
const jwt = require("jsonwebtoken"); // For decoding the user token

// Controller to add a new contact
const addContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, email } = req.body.formData;

    // Validate input
    if (!firstName || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user and populate their contacts
    const user = await User.findById(req.user.id).populate("contacts");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the phone number already exists in the user's contacts
    const isPhoneExist = user.contacts.some((contact) => contact?.phone == phone);
    // console.log(user)

    if (isPhoneExist) {
      return res
        .status(409)
        .json({ message: "A contact with this phone number already exists." });
    }

    // Create a new contact
    const newContact = await Contact.create({
      userId: req.user.id,
      firstName,
      lastName,
      phone,
      address,
      email,
    });

    // Add the contact ID to the user's contacts array
    user.contacts.push(newContact._id);
    await user.save();

    res.status(201).json({
      message: "Contact created successfully.",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error adding contact:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Controller to fetch all contacts for a particular user
const getAllContacts = async (req, res) => {
  try {
    const token = req.body.token; // Get the token from the request body

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Find the user and populate their contacts
    const user = await User.findById(req.user.id).populate("contacts");
    let contacts = user.contacts

    if (!contacts || contacts.length == 0) {
      return res
        .status(404)
        .json({ message: "No contacts found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Contacts fetched successfully", contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { addContact, getAllContacts };
