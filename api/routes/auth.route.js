import express from 'express';
import { signup, signOut, signin } from '../controllers/auth.controller.js';

const router = express.Router();

// Post request to /signup - Sign Up Route
router.post("/signup", signup);

// Post request to /signin - Sign In Route
router.post("/signin", signin);

// Get request to signout - Sign Out Route
router.get('/signout', signOut);

export default router;