import express from 'express';
import { deleteUser, test, updateUser, getUserWorkouts, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);

// Update User Router - Check if person is authenticated with cookie
router.post('/update/:id', verifyToken, updateUser)

// Delete User Route
router.delete('/delete/:id', verifyToken, deleteUser)

// Get User Workout Route
router.get('/workout/:id', verifyToken, getUserWorkouts)

// Get User Info Route
router.get('/:id', verifyToken, getUser)

export default router;