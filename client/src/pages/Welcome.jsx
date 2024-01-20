import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import welcomeImage from '../images/gym-image-one.png';
 
export default function Welcome() {
  // Current user - Redux
  const { currentUser } = useSelector((state) => state.user);
  // Initial user state
  const [user, setUser] = useState(null);
  // Initialize use navigate
  let navigate = useNavigate();
  // Function to navigate user to sign-up page when button clicked 
  const redirectToWorkout = () => {
    navigate('/workout');
  }

  // Function to navigate user to create workout page when button clicked
  const redirectToCreateWorkout = () => {
    navigate('/create-workout');
  }

  // Fetch User data to display Name on Welcome page
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Request to api using current user id 
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        // Set User with data response from api
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch user function call
    fetchUser();
  }, []);
  
  return (
    <>
        {/* If user is true then display "Welcome, user's first name" on Welcome page */}
        {user && (
          <div className='font-teko text-electric-300 text-center flex flex-col'>
            <p className='text-6xl'>Welcome,</p>
            <p className='text-heather-gray-300 text-4xl text-heather-300'>{user.firstName}</p>
          </div>
        )}

      <div className='p-3 mx-auto max-w-lg'>
        <div className='flex justify-center py-5'>
          {/* Direct user to Workout page if select this button */}
          <button 
            className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 mx-auto w-1/2 font-teko text-xl mr-3 hover:underline'
            onClick={redirectToWorkout}>
            View Workout
            </button>
          {/* Direct user to Create Workout page if select this button */}
          <button 
            className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 flex justify-center w-1/2 font-teko text-xl hover:underline'
            onClick={redirectToCreateWorkout}>
            Create Workout
          </button>
        </div>
      </div>
      <div>
          {/* Image on Welcome Page */}
          <div className='flex justify-center mx-auto max-w-4xl mb-10 px-3'>
            <img src={welcomeImage} />
          </div>
      </div>
    </>
  )
}
