import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateWorkout() {
  // Current user
  const { currentUser } = useSelector((state) => state.user);
  // Initialize use navigate
  const navigate = useNavigate();
  // Workout data state
  const [workoutData, setworkoutData] = useState({
    title: '',
    load: '',
    reps: '',
    sets: '',
    duration: '',
    category: 'weight training'
  });
  // Error state
  const [error, setError] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(false);
 
  // Handle change for workout data - category, title, load, reps, sets, duration
  const handleChange = (e) => {
      setworkoutData({
        ...workoutData,
        [e.target.id]: e.target.value,
      });
  };

  // Handle submit - POST request to database on create route with data from workout category and form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      // POST request to database
      const res = await fetch('/api/workout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workoutData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      // If error display message; else navigate to Workout page
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate('/workout')
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-electric-300 text-center my-7 font-teko text-6xl'>
        Create Workout
      </h1>
      <p className='text-xl text-electric-300 font-teko mb-3'>Select Exercise Category:</p>
      <div className='flex flex-col gap-4 flex-1 mb-7'>
        {/* Select weight training or cardio as category */}
        <select 
          value={workoutData.category} 
          onChange={handleChange} 
          className='border-2 border-electric-300 p-3 rounded-lg font-teko text-cinder-950 text-lg'
          id='category'
          >
            <option value={'weight training'}>Weight Training</option>
            <option value={'cardio'}>Cardio</option>
        </select>
      </div>
      {/* Conditional rendering based on category for select option (weight training)*/}
      { workoutData.category === 'weight training' && (
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
          {/* Exercise Title input for weight training */}
          <input
            type='text'
            placeholder='Exercise Title'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='title'
            required
            onChange={handleChange}
            value={workoutData.title}
          />
          {/* Exercise load input for weight training */}
          <p className='text-electric-300 font-teko text-xl'>Load (in lbs):</p>
          <input
            type='text'
            placeholder='Load'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='load'
            required
            onChange={handleChange}
            value={workoutData.load}
          />
          {/* Exercise reps input for weight training */}
          <p className='text-electric-300 font-teko text-xl'>Reps:</p>
          <input
            type='text'
            placeholder='Reps'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='reps'
            required
            onChange={handleChange}
            value={workoutData.reps}
          />
          {/* Exercise sets input for weight training */}
          <p className='text-electric-300 font-teko text-xl'>Sets:</p>
          <input
            type='text'
            placeholder='Sets'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='sets'
            required
            onChange={handleChange}
            value={workoutData.sets}
          />
          {/* Add exercise button for weight training to send to create POST request */}
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Adding Exercise...' : 'Add Exercise'}
            </button>
            {/* Display error if one occurs */}
            {error && <p className='text-electric-300 text-lg font-teko'>{error}</p>}
        </div>
      </form>
      )}
      {/* Conditional rendering based on category for select option (cardio)*/}
      {workoutData.category === 'cardio' && (
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-electric-300 font-teko text-xl'>Exercise Title:</p>
          {/* Exercise title for cardio */}
          <input
            type='text'
            placeholder='Exercise Title'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='title'
            required
            onChange={handleChange}
            value={workoutData.title}
          />
          {/* Exercise duration for cardio */}
          <p className='text-electric-300 font-teko text-xl'>Exercise Duration (minutes):</p>
          <input
            type='text'
            placeholder='Exercise Duration'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='duration'
            required
            onChange={handleChange}
            value={workoutData.duration}
          />
          {/* Add exercise button for cardio to send to create POST request */}
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Adding Exercise...' : 'Add Exercise'}
            </button>
            {/* Display error if one occurs */}
            {error && <p className='text-electric-300 text-lg font-teko'>{error}</p>}
        </div>
        </form>
      )}
    </main>
  );
}