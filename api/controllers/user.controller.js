import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Workout from '../models/workout.model.js';
import { errorHandler } from '../utils/error.js';

// Test route
export const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
  };

// Update User Controller
export const updateUser = async (req, res, next) => {
  // Check if user id matches requesting user id
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  // Hash password if update password
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
     // Find user by ID and update information - specify what can update with set
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
      $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
      // Return new (updated) information
      { new: true }
    );
    // Destructure so password is not send back
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

// Delete User Controller
export const deleteUser = async (req, res, next) => {
  // Check if user id matches requesting user id
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  // Delete user if user matches request id and clear access token
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Get User Workouts Controller
export const getUserWorkouts = async (req, res, next) => {
  // Check if user id matches requesting user id
  if (req.user.id === req.params.id) {
    // Get workouts for user id
    try {
      const workouts = await Workout.find({ userRef: req.params.id });
      res.status(200).json(workouts);
    } catch (error) {
      next(error);
    }
    // Return can only view own workout if user id does not match requesting user id
  } else {
    return next(errorHandler(401, 'You can only view your own workout!'));
  }
};


// Get User Info Controller
export const getUser = async (req, res, next) => {
  // Find user information based on requesting user id
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, 'User not found!'));
    // Destructure response so do not send user password
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};