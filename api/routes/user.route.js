import express from 'express';
import { deleteUser, test, updateUser, getUserWorkouts, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);

// Update User Router - Check if user is authenticated with cookie
router.post('/update/:id', verifyToken, updateUser)

// Delete User Route - Check if user is authenticated with cookie
router.delete('/delete/:id', verifyToken, deleteUser)

// Get User Workout Route - check if user is authenticated with cookie
router.get('/workout/:id', verifyToken, getUserWorkouts)

// Get User Info Route - check if user is authenticated with cookie
router.get('/:id', verifyToken, getUser)

export default router;