import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function UpdateWorkout() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    load: '',
    reps: '',
    sets: '',
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchWorkout = async () => {
      const workoutId = params.workoutId;
      const res = await fetch(`/api/workout/get/${workoutId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchWorkout();
  }, []);


  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' 
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/workout/update/${params.workoutId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate('/workout');
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
      {/* <select name='SelectType' className=''>
        <option value='weightTraining'>Weight Training</option>
        <option value='cardio'>Cardio</option>
      </select> */}
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-electric-300 font-teko text-lg'>Exercise Title:</p>
          <input
            type='text'
            placeholder='Exercise Title'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='title'
            required
            onChange={handleChange}
            value={formData.title}
          />
          <p className='text-electric-300 font-teko text-lg'>Load (in lbs):</p>
          <input
            type='text'
            placeholder='Load'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='load'
            required
            onChange={handleChange}
            value={formData.load}
          />
          <p className='text-electric-300 font-teko text-lg'>Reps:</p>
          <input
            type='text'
            placeholder='Reps'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='reps'
            required
            onChange={handleChange}
            value={formData.reps}
          />
          <p className='text-electric-300 font-teko text-lg'>Sets:</p>
          <input
            type='text'
            placeholder='Sets'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='sets'
            required
            onChange={handleChange}
            value={formData.sets}
          />
          <button 
            disabled={loading}
            className='my-5 bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'>
              {loading ? 'Updating Exercise...' : 'Update Exercise'}
            </button>
            {error && <p className='text-electric-300 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}