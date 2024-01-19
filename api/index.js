import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import workoutRouter from './routes/workout.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
  
dotenv.config();

// Connect to database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

// Make Dynamic Directory Name 
const __dirname = path.resolve();

// Create application
const app = express();

// Allow json to be sent to server
app.use(express.json());

// Use cookie parser
app.use(cookieParser());

// Port where application listens
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)

// Create Routers
// User Router
app.use('/api/user', userRouter);
// Authorization router
app.use('/api/auth', authRouter);
// Workout router
app.use('/api/workout', workoutRouter);

// Create static folder - if go to '/' route 
app.use(express.static(path.join(__dirname, '/client/dist')));

// Any address besides the routes above, run index.html inside client side dist folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

// Error 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});