import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
      }
        setLoading(false);
        setError(null);
        navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-electric-300 font-teko text-6xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
            type='text'
            placeholder='First Name'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='firstName'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Last Name'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='lastName'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Username'
            className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
            id='username'
            onChange={handleChange}
          />
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
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      <div className="flex gap-2 mt-5">
        <p className='text-heather-gray-300 font-teko text-xl'>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-electric-300 font-teko text-xl hover:underline'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}