import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Sign Up Controller
export const signup = async (req, res, next) => {
  // Destructure request
  const { username, email, password, firstName, lastName } = req.body;
  // Hash password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Make new user - save information inside database
  const newUser = new User({ username, email, password: hashedPassword, firstName, lastName });
  // Save new user to database if successful
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

// Sign in Controller
export const signin = async (req, res, next) => {
  // Email and password from request body
  const { email, password } = req.body;
  try {
    // Check if email is valid - if valid check password
    const validUser = await User.findOne({ email });
    // Error if email is not valid
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    // Check password if email is valid - use compare sync to compare hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // Error if password is not valid
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    // Create token - use user id for user so do not use email, username, or password - use to authenitcate user
    // JWT Secret is for adding security - key pair for added security; user id is hashed with JWT secret key
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Destructure password and rest of user information - remove password before sending back to user
    const { password: pass, ...rest } = validUser._doc;
    // Save token as cookie
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}

// Sign Out Controller
export const signOut = async (req, res, next) => {
  // Clear cookie to sign out user
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

