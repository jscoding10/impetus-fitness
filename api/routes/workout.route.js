import express from 'express';
import { createWorkout, deleteWorkout, updateWorkout, getWorkout  } from '../controllers/workout.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Create Workout Route
router.post('/create', verifyToken, createWorkout);

// Delete Workout Route
router.delete('/delete/:id', verifyToken, deleteWorkout);

// Update Workout Route
router.post('/update/:id', verifyToken, updateWorkout);

// Get Workout Route
router.get('/get/:id', getWorkout);


export default router;