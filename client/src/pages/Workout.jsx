import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, FileEdit } from 'lucide-react';

export default function Workout() {
  const { currentUser } = useSelector((state) => state.user);
  const [ workouts, setWorkouts ] = useState([]);

  let navigate = useNavigate();

  const redirectToCreateWorkout = () => {
    navigate('/create-workout');
  }

  // const redirectToUpdateWorkout = () => {
  //   navigate(`/update-workout/${workout._id}`);
  // }
  // // null

  useEffect(() => {
    const fetchWorkouts = async () => {
      try{
        const response = await fetch(`/api/user/workout/${currentUser._id}`)
        const data = await response.json()
        setWorkouts(data);
    } catch (error) {
      console.log(error);
      }
    };
    fetchWorkouts();
  }, []);

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const res = await fetch(`/api/workout/delete/${workoutId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
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
        {workouts && workouts.map((workout) => (
          
        <div key={workout._id} className='flex justify-evenly mx-auto text-center py-5 bg-heather-gray-200 text-cinder-950 border border-electric-300 border-4 rounded-3xl max-w-2xl my-2'>
          {workout.category === 'weight training' && (
          <div className='flex gap-4 justify-evenly max-w-2xl h-full flex-1 font-teko text-2xl'>
            <p className='' key={workout._id + 1}>{workout.title}</p>
            <p className='' key={workout._id + 2}>{workout.load} lbs</p>
            <p className='' key={workout._id + 3}>{workout.reps} reps</p>
            <p className='' key={workout._id + 4}>{workout.sets} sets</p>
          </div>
          )}
          {workout.category === 'cardio' && (
          <div className='flex gap-4 justify-evenly max-w-2xl h-full flex-1 font-teko text-2xl'>
            <p className='' key={workout._id + 1}>{workout.title}</p>
            <p className='' key={workout._id + 2}>{workout.duration} minutes</p>
          </div>
          )}
          <button>
            <Link className='hover:text-electric-300' to={`/update-workout/${workout._id}`}>
              <FileEdit className='mx-2' />
            </Link>
          </button>
          <button className='hover:text-electric-300'>
            <Trash2 className='mx-2'  onClick={() => handleDeleteWorkout(workout._id)}/>
          </button>
        </div>
        ))}
        <div className='mx-auto flex justify-center max-w-lg my-5'>
            {/* <button 
              className='bg-heather-gray-200 text-cinder-950 uppercase hover:opacity-95 disabled:opacity-80 border-2 rounded-3xl border-electric-300 py-4 w-full h-full'
              onClick={redirectToCreateWorkout}>
              Add Exercise
              </button> */}
              <p className='text-electric-300 cursor-pointer hover:underline font-teko text-xl'
              onClick={redirectToCreateWorkout}>Add Exercise</p>
          </div>
    </div>
  )
}

