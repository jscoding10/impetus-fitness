import Workout from '../models/workout.model.js';
import { errorHandler } from '../utils/error.js';

// Create Workout Controller
export const createWorkout = async (req, res, next) => {
  // Create workout
  try {
    const workout = await Workout.create(req.body);
    return res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
};

// Delete Workout Controller
export const deleteWorkout = async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);
  // Check if workout exists by id
  if (!workout) {
    return next(errorHandler(404, 'Exercise not found!'));
  }
  // Check if requesting user matches the user id for workout
  if (req.user.id !== workout.userRef) {
    return next(errorHandler(401, 'You can only delete your own exercise!'));
  }
  // Find workout by id and delete
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json('Exercise has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update Workout Controller
export const updateWorkout = async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) {
    return next(errorHandler(404, 'Exercise not found!'));
  }
  if (req.user.id !== workout.userRef) {
    return next(errorHandler(401, 'You can only update your own exercises!'));
  }
  try {
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
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return next(errorHandler(404, 'Exercise not found!'));
    }
    res.status(200).json(workout);
  } catch (error) {
    next(error);
  }
}