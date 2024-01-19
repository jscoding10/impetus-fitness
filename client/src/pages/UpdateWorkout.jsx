import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function UpdateWorkout() {
  // Current user from Redux
  const { currentUser } = useSelector((state) => state.user);
  // Initialize use navigate 
  const navigate = useNavigate();
  // Initialize params
  const params = useParams();
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: '',
    sets: '',
    duration: '',
    category: '',
  });
  // Error state
  const [error, setError] = useState(false);
  // Loading state
  const [loading, setLoading] = useState(false);

  // Use effect to fetch workout data
  useEffect(() => {
    const fetchWorkout = async () => {
      // ID of workout
      const workoutId = params.workoutId;
      // GET request to api for specific workout
      const res = await fetch(`/api/workout/get/${workoutId}`);
      const data = await res.json();
      // Console log message if data success is false
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // Set form data with data from response
      setFormData(data);
    };
    // Call fetch workout
    fetchWorkout();
  }, []);

  // Handle change for form inputs - save previous data and update changes
  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  // Handle submit - POST request to database on update route with workout ID to ensure specific workout is updated
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      // POST request to api with specific workout id to update
      const res = await fetch(`/api/workout/update/${params.workoutId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send form data and current user id
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      // Set error if data success is false else navigate to '/workout' page
      if (data.success === false) {
        setError(data.message);
      } else {
      navigate('/workout');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-electric-300 text-center my-7 font-teko text-6xl'>
        Update Workout
      </h1>
      <p className='text-xl text-electric-300 font-teko mb-3'>Select Exercise Category:</p>
      <div className='flex flex-col gap-4 flex-1 mb-7'>
        {/* Select weight training or cardio as category */}
        <select 
          value={formData.category} 
          onChange={handleChange} 
          className='border-2 border-electric-300 p-3 rounded-lg font-teko text-cinder-950 text-lg'
          id='category'
          >
            <option value={'weight training'}>Weight Training</option>
            <option value={'cardio'}>Cardio</option>
        </select>
      </div>
      {/* Conditional rendering based on category for select option (weight training)*/}
      { formData.category === 'weight training' && (
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
            value={formData.title}
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
            value={formData.load}
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
            value={formData.reps}
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
            value={formData.sets}
          />
          {/* Add exercise button for weight training to send to create POST request */}
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Updating Exercise...' : 'Update Exercise'}
            </button>
            {/* Display error if one occurs */}
            {error && <p className='text-electric-300 text-xl font-teko'>{error}</p>}
        </div>
      </form>
      )}
      {/* Conditional rendering based on category for select option (cardio)*/}
      {formData.category === 'cardio' && (
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
            value={formData.title}
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
            value={formData.duration}
          />
          {/* Add exercise button for cardio to send to create POST request */}
          <button  
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Updating Exercise...' : 'Update Exercise'}
            </button>
            {/* Display error if one occurs */}
            {error && <p className='text-electric-300 text-xl font-teko'>{error}</p>}
        </div>
        </form>
      )}
    </main>
  );
}


