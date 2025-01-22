const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const authenticate = async (req, res, next) => {
  const token = req.body;
  // console.log(req.body)
  
  if (!token.token) {
    return res.status(401).json({ message: 'Unauthorized1' });
  }
  try {
    const decoded = jwt.verify(token.token, process.env.SECRET);
    const user = await User.findById(decoded.userId); 
    // console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized2' });
    }

    // res.send({ firstName: user.firstName, lastName: user.lastName, id: user._id });
    req.user = { email: user.email, id: user.id};

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };