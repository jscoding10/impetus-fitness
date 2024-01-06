import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
      }
        dispatch(signInSuccess(data));
        navigate('/welcome');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-electric-300 font-teko text-6xl'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* <input
            type='text'
            placeholder='username'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950'
            id='username'
            onChange={handleChange}
          /> */}
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='password'
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      <div className="flex gap-2 mt-5">
        <p className='text-heather-gray-300 font-teko text-lg'>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-electric-300 font-teko text-lg hover:underline'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}

{/* <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950' id='username' />
        <input type="email" placeholder='email' className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950' id='email' />
        <input type="password" placeholder='password' className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950' id='password' />
        <button className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300'>Sign up</button>
      </form> */}