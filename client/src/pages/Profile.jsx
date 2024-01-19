// Profile Page 
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
  // User, loading, and error from Redux
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // Update User Success state
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // Workout Data state
  const [userData, setUserData] = useState({});
  // Initialize use dispatch
  const dispatch = useDispatch();

  // Handle change for update profile information - save previous information and update changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  // Handle submit for updating user profile information - set update success to true if successful
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch update user start
      dispatch(updateUserStart());
      // POST request to api to update user information
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      // Dispatch update user failure if data success is false
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      // Dispatch update user success
      dispatch(updateUserSuccess(data));
      // Set Update Success to true 
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      // Dispatch delete user start
      dispatch(deleteUserStart());
      // Delete request to api
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      // Dispatch delete user failure if data success is false
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      // Dispatch delete user success
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Dispatch sign out user start
      dispatch(signOutUserStart());
      // Request to sign out user to api
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      // Dispatch sign out user failure if data success is false
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      // Dispatch sign out user success
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }
 
  return ( 
  <div className='p-3 max-w-xl mx-auto'>
    <h1 className='text-center my-7 text-electric-300 font-teko text-6xl'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      {/* First Name of User */}
      <p className='font-teko text-xl text-electric-300'>First Name:</p>
      <input
        type='text'
        placeholder='First Name'
        defaultValue={currentUser.firstName}
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        id='firstName'
        onChange={handleChange}
      />
      {/* Last Name of User */}
      <p className='font-teko text-xl text-electric-300'>Last Name:</p>
      <input
        type='text'
        placeholder='Last Name'
        defaultValue={currentUser.lastName}
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        id='lastName'
        onChange={handleChange}
      />
      {/* Username of User */}
      <p className='font-teko text-xl text-electric-300'>Username:</p>
      <input 
        type="text" 
        placeholder='Username' 
        defaultValue={currentUser.username}
        id='username' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'
        onChange={handleChange}  
      />
      {/* Email of User */}
      <p className='font-teko text-xl text-electric-300'>Email:</p>
      <input 
        type="email" 
        placeholder='Email' 
        defaultValue={currentUser.email}
        id='email' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg' 
        onChange={handleChange} 
      />
      {/* Password of User - current password not shown to user */}
      <p className='font-teko text-xl text-electric-300'>Password:</p>
      <input 
        type="password" 
        placeholder='Password'
        onChange={handleChange}
        id='password' 
        className='border-2 border-electric-300 p-3 rounded-lg placeholder-cinder-950 font-teko text-lg'  
      />
      {/* Update information button - click to update */}
      <button 
        disabled={loading}
        className='bg-heather-gray-200 text-cinder-950 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 border-2 border-electric-300 mt-5 font-teko text-xl hover:underline'>
        {loading ? 'Loading...' : 'Update'}
      </button>
    </form>
    <div className="flex justify-between mt-5">
      {/* Delete account */}
      <span 
        onClick={handleDeleteUser}
        className='text-electric-300 cursor-pointer hover:underline font-teko text-xl'
        >
          Delete account
      </span>
      {/* Sign Out */}
      <span 
          onClick={handleSignOut} 
          className='text-electric-300 cursor-pointer hover:underline font-teko text-xl'
        >
          Sign out
      </span>
    </div>
    {/* Display error if there is one updating information */}
    <p className='text-electric-300 mt-5 text-center font-teko text-xl'>{error ? error : ''}</p>
    {/* If profile updated successfully display profile updated successfully */}
    <p className='text-electric-300 mt-5 text-center font-teko text-xl'>
      {updateSuccess ? 'Profile updated successfully!' : ''}
    </p>
  </div>
  )
}