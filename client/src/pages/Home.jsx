// Home Page 
import React from 'react'
import { useNavigate } from 'react-router-dom';
import homepageImage from '../images/homepage-image.png';
import ImpetusLogo from '../images/impetus-fitness-logo.png';
 
export default function Home() {

  // Initialize use navigate
  const navigate = useNavigate();
  // Function to navigate user to sign up page when button clicked 
  const redirectSignUp = () => {
    navigate('/sign-up');
  }
  
  return (
    <div>
        <div className='p-3 mx-auto flex flex-col'>
          <h2 className='flex justify-center text-heather-gray-300 uppercase text-start font-teko text-xl'>The premire fitness application</h2>
          <h1 className='flex justify-center text-electric-300 text-4xl flex-1 font-teko text-6xl'>Impetus Fitness</h1>
          {/* Logo */}
          <img src={ImpetusLogo} className='h-64 w-64 flex justify-center mx-auto mt-5 mb-7' />
          <h2 className='flex justify-center text-heather-gray-300 uppercase text-start font-teko text-2xl mb-5'>Store your daily workouts and achieve your fitness goals</h2>
          <div className='flex justify-center'>
            {/* Get Started Button - Redirect to sign up page if click it */}
            <button 
              className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 flex justify-center font-teko text-xl mb-10 w-64 hover:underline'
              onClick={redirectSignUp}>
              Get Started
              </button>
          </div>
          {/* Image */}
          <div className='flex justify-center mx-auto max-w-4xl mb-10'>
            <img src={homepageImage} />
          </div>
        </div>
    </div>
  )
}
