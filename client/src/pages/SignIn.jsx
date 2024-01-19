// Sign In Page 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart, 
  signInSuccess, 
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  // Form data state
  const [formData, setFormData] = useState({});
  // Loading and error from Redux
  const { loading, error } = useSelector((state) => state.user);

  // Initialize use navigate
  const navigate = useNavigate();
  // Initialize use dispatch
  const dispatch = useDispatch();
  
  // Handle change to set form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle submit to submit form data - POST request to sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch sign in start
      dispatch(signInStart());
      // POST request to api for sign in
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      // Dispatch sign in failure if data success is false
      if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
      } 
        // Dispatch sign in success
        dispatch(signInSuccess(data));
        // Navigate to '/welcome'
        navigate('/welcome');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }; 
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-electric-300 font-teko text-6xl'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {/* Email input for user */}
        <p className='font-teko text-xl text-electric-300'>Email:</p>
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='email'
            onChange={handleChange}
          />
          {/* Password input for user */}
          <p className='font-teko text-xl text-electric-300'>Password:</p>
          <input
            type='password'
            placeholder='Password'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='password'
            onChange={handleChange}
          />
          {/* Sign in Button - handle submit when click button - on submit with form */}
          <button
            disabled={loading}
            className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline mt-5'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className='text-heather-gray-300 font-teko text-xl'>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-electric-300 font-teko text-xl hover:underline'>Sign up</span>
        </Link>
      </div>
  </div>
  )
}
