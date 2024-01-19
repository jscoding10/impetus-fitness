import Workout from '../models/workout.model.js';
import { errorHandler } from '../utils/error.js';

// Create Workout Controller
export const createWorkout = async (req, res, next) => {
  // Create workout
  try {
    // Create workout in database
    const workout = await Workout.create(req.body);
    // Respond with workout as json if successful
    return res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

// Delete Workout Controller
export const deleteWorkout = async (req, res, next) => {
  // Find workout by id
  const workout = await Workout.findById(req.params.id);
  // Check if workout exists by id
  if (!workout) {
    return next(errorHandler(404, 'Exercise not found!'));
  }
  // Check if requesting user matches user ref of workout
  if (req.user.id !== workout.userRef) {
    return next(errorHandler(401, 'You can only delete your own exercise!'));
  }
  // Find workout by id and delete in database
  try {
    await Workout.findByIdAndDelete(req.params.id);
    // Send 'Exercise has been deleted' back 
    res.status(200).json('Exercise has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update Workout Controller
export const updateWorkout = async (req, res, next) => {
  // Find workout by id
  const workout = await Workout.findById(req.params.id);
  // Check if workout exists
  if (!workout) {
    return next(errorHandler(404, 'Exercise not found!'));
  }
  // Check to make sure requesting user matches user ref
  if (req.user.id !== workout.userRef) {
    return next(errorHandler(401, 'You can only update your own exercises!'));
  }
  try {
    // Update workout in database by id and respond with updated workout if successful
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedWorkout);
  } catch (error) {
    next(error);
  }
};

// Get Workout Controller
export const getWorkout = async (req, res, next) => {
  try {
    // Find workout by id in url
    const workout = await Workout.findById(req.params.id);
    // Check if workout exists
    if (!workout) {
      return next(errorHandler(404, 'Exercise not found!'));
    }
    // Respond with workout
    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
}