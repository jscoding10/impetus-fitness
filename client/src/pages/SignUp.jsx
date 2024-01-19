// Sign Up Page
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  // Form data state
  const [formData, setFormData] = useState({});
  // Error state
  const [error, setError] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(false);

  // Initialize use navigate
  const navigate = useNavigate();
  
  // Handle change when submit form data for sign up
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
 
  // Handle submit for form data when sign up - POST request to submit form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // POST request to api to send form data to sign up user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      // Set loading to false and set error to message if data success is false
      if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
      }
      // Set loading to false, set error to null, and navigate to sign in page
        setLoading(false);
        setError(null);
        navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-electric-300 font-teko text-6xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {/* First Name input for user */}
        <p className='font-teko text-xl text-electric-300'>First Name:</p>
        <input
            type='text'
            placeholder='First Name'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='firstName'
            onChange={handleChange}
          />
          {/* Last Name input for user */}
          <p className='font-teko text-xl text-electric-300'>Last Name:</p>
          <input
            type='text'
            placeholder='Last Name'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='lastName'
            onChange={handleChange}
          />
          {/* Username input for user */}
          <p className='font-teko text-xl text-electric-300'>Username:</p>
          <input
            type='text'
            placeholder='Username'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='username'
            onChange={handleChange}
          />
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
          {/* Sign Up Button - handle submit when click button - on submit with form */}
          <button 
            disabled={loading}
            className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 font-teko text-xl hover:underline mt-5'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      <div className="flex gap-2 mt-5">
        <p className='text-heather-gray-300 font-teko text-xl'>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-electric-300 font-teko text-xl hover:underline pb-5'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}