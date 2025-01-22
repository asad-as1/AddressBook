const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contact.controller');
const { authenticate } = require('../middlewares/auth'); 

router.post('/addcontact', authenticate, contactController.addContact);
router.post('/getcontact', authenticate, contactController.getAllContacts);

// router.post('/profile', authenticate, userController.getProfile);
// router.put('/profile', authenticate, userController.updateProfile);
// router.delete('/delete', authenticate, userController.deleteUser); //TODO

module.exports = router;