import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import workoutRouter from './routes/workout.route.js';
import cookieParser from 'cookie-parser';
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

// Create application
const app = express();

// Allow json to be sent to server
app.use(express.json());

// Use cookie parser
app.use(cookieParser());

// Use Workout Router
// app.use('/api/workout', workoutRouter);

// Port where application listens
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)
// Create Routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/workout', workoutRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});