import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }

  return ( 
  <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-center my-7 text-electric-300 font-teko text-6xl'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      {/* <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' /> */}
      <p className='font-teko text-lg text-electric-300'>First Name:</p>
      <input
        type='text'
        placeholder='First Name'
        defaultValue={currentUser.firstName}
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        id='firstName'
        onChange={handleChange}
      />
      <p className='font-teko text-lg text-electric-300'>Last Name:</p>
      <input
        type='text'
        placeholder='Last Name'
        defaultValue={currentUser.lastName}
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        id='lastName'
        onChange={handleChange}
      />
      <p className='font-teko text-lg text-electric-300'>Username:</p>
      <input 
        type="text" 
        placeholder='Username' 
        defaultValue={currentUser.username}
        id='username' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        onChange={handleChange}  
      />
      <p className='font-teko text-lg text-electric-300'>Email:</p>
      <input 
        type="email" 
        placeholder='Email' 
        defaultValue={currentUser.email}
        id='email' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg' 
        onChange={handleChange} 
      />
      <p className='font-teko text-lg text-electric-300'>Password:</p>
      <input 
        type="password" 
        placeholder='Password'
        onChange={handleChange}
        id='password' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'  
      />
      <button 
        disabled={loading}
        className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 mt-5 font-teko text-xl hover:underline'>
        {loading ? 'Loading...' : 'Update'}
      </button>

    </form>
  <div className="flex justify-between mt-5">
    <span 
      onClick={handleDeleteUser}
      className='text-electric-300 cursor-pointer hover:underline font-teko text-xl'
      >
        Delete account</span>
    <span onClick={handleSignOut} className='text-electric-300 cursor-pointer hover:underline font-teko text-xl'>Sign out</span>
  </div>

  <p className='text-electric-300 mt-5 text-center font-teko text-lg'>{error ? error : ''}</p>
  <p className='text-electric-300 mt-5 text-center font-teko text-lg'>
    {updateSuccess ? 'Profile updated successfully!' : ''}
  </p>
</div>
)
}