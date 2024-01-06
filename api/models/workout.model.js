// Workout Model
import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: String,
      required: false,
    },
    sets: {
      type: String,
      required: false,
    },
    load: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    duration: { 
      type: String,
      required: false,
    },
    userRef: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;

// // Workout Model
// import mongoose from 'mongoose';

// const workoutSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     reps: {
//       type: String,
//       required: true,
//     },
//     sets: {
//       type: Number,
//       required: true,
//     },
//     load: {
//       type: Number,
//       required: true,
//     },
//     userRef: {
//         type: String,
//         required: true,
//       },
//   },
//   { timestamps: true }
// );

// const Workout = mongoose.model('Workout', workoutSchema);

// export default Workout;