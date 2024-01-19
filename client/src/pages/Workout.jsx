import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, FileEdit } from 'lucide-react'; 
 
export default function Workout() {
  // Current user from Redux
  const { currentUser } = useSelector((state) => state.user);
  // Workouts state
  const [ workouts, setWorkouts ] = useState([]);

  // Initialize use navigate
  let navigate = useNavigate();
 
  // Function to redirect to create workout page
  const redirectToCreateWorkout = () => {
    navigate('/create-workout');
  }

// Use Effect to fetch a user's workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      try{
        // Get request to api for user's workouts with their id
        const response = await fetch(`/api/user/workout/${currentUser._id}`)
        const data = await response.json()
        // Set workouts with response from api
        setWorkouts(data);
    } catch (error) {
      console.log(error);
      }
    };
    // Fetch workouts function call
    fetchWorkouts();
  }, []);

  // Delete Workout
  const handleDeleteWorkout = async (workoutId) => {
    try {
      // Delete request to api to delete a specific workout by id
      const res = await fetch(`/api/workout/delete/${workoutId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      // Console log message if data success is false
      if (data.success === false) {
        console.log(data.message);
        return; 
      }
      // Keep workouts that do not have matching id to the one deleted - use filter method
      setWorkouts((prev) =>
        prev.filter((workout) => workout._id !== workoutId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 className='text-center text-electric-300 text-3xl py-3 font-teko text-6xl'>Workout</h1>
        {/* If workouts is true, map through array with workout data  */}
        {workouts && workouts.map((workout) => (
        <div key={workout._id} className='flex justify-evenly mx-auto text-center py-5 bg-heather-gray-200 text-cinder-950 border border-electric-300 border-4 rounded-3xl max-w-2xl my-2'>
          {/* If workout category is weight training, display the following workout information to the user */}
          {workout.category === 'weight training' && (
          <div className='flex gap-4 justify-evenly max-w-2xl h-full flex-1 font-teko text-2xl'>
            <p className='' key={workout._id + 1}>{workout.title}</p>
            <p className='' key={workout._id + 2}>{workout.load} lbs</p>
            <p className='' key={workout._id + 3}>{workout.reps} reps</p>
            <p className='' key={workout._id + 4}>{workout.sets} sets</p>
          </div>
          )}
          {/* If workout category is cardio, display the following workout information to the user */}
          {workout.category === 'cardio' && (
          <div className='flex gap-4 justify-evenly max-w-2xl h-full flex-1 font-teko text-2xl'>
            <p className='' key={workout._id + 1}>{workout.title}</p>
            <p className='' key={workout._id + 2}>{workout.duration} minutes</p>
          </div>
          )}
          {/* Edit Workout - redirect to update workout page using workout id */}
          <button>
            <Link className='hover:text-electric-300' to={`/update-workout/${workout._id}`}>
              <FileEdit className='mx-2' />
            </Link>
          </button>
          {/* Delete Workout - delete workout using workout id */}
          <button className='hover:text-electric-300'>
            <Trash2 className='mx-2' onClick={() => handleDeleteWorkout(workout._id)}/>
          </button>
        </div>
        ))}
        {/* Add exercise - redirect to Create Workout page */}
        <div className='mx-auto flex justify-center max-w-xl my-5'>
              <p className='text-electric-300 cursor-pointer hover:underline font-teko text-2xl'
              onClick={redirectToCreateWorkout}>Add Exercise</p>
          </div>
    </div>
  )
}

