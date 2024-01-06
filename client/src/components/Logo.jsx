import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImpetusLogo from '../../images/impetus-fitness-logo.png';

export default function Logo() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='flex' >
      {currentUser ? (
        <>
          <NavLink className='text-electric-300 font-teko font-teko text-3xl flex' to='/welcome'>
            <img className='w-16 h-16 flex' src={ImpetusLogo} />
            <p className='my-auto pl-2'>Impetus Fitness</p>
          </NavLink>
        </>
    ) : (
        <>
          <NavLink className='text-electric-300 font-teko font-teko text-3xl flex' to='/'>
            <img className='w-16 h-16 flex' src={ImpetusLogo} />
            <p className='my-auto pl-2'>Impetus Fitness</p>
          </NavLink>
        </>
      )}
    </div>
  )
}
