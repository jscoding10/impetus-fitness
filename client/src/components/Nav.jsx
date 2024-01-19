// Nav Component 
// import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
  } from '../redux/user/userSlice';

// Links in the Nav Bar
const NavLinks = () => {
  // Current user with Redux
  const { currentUser } = useSelector((state) => state.user)
  // Initialize use dispatch
  const dispatch = useDispatch(); 

  // Handle sign out for sign out in Nav bar
  const handleSignOut = async () => {
    try {
      // Dispatch sign out user start from Redux
      dispatch(signOutUserStart());
        // Get request to api to sign out user
        const res = await fetch('api/auth/signout');
        const data = await res.json();
        // Dispatch sign out user failure from Redux if data success is false
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        // Dispatch sign out user success from Redux if successful
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(data.message));
      }
    }

  // Nav links
  return (
    <>
        {currentUser ? (
            // If user authenticated, show these options in nav
            <>
                <NavLink className='hover:underline hover:text-electric-300 px-10 font-teko text-2xl' to='/workout'>My Workout</NavLink>
                <NavLink className='hover:underline hover:text-electric-300 px-10 font-teko text-2xl' to='/create-workout'>Create Workout</NavLink>
                <NavLink className='hover:underline hover:text-electric-300 px-10 font-teko text-2xl' to='/profile'>Profile</NavLink>
                <span onClick={handleSignOut} className='hover:underline hover:cursor-pointer hover:text-electric-300 list-none px-10 font-teko text-2xl'>Sign Out</span>  
            </>
        ) : (
            // If user not authenticated, show these options in nav
            <>
                <NavLink className='hover:underline hover:text-electric-300 px-10 font-teko text-2xl' to='/'>Home</NavLink>
                <NavLink className='hover:underline hover:text-electric-300 px-10 font-teko text-2xl' to='/sign-in'>Sign In</NavLink>
            </>
        )}
    </>
  )
} 

// Nav bar
export default function Nav () {
    // Local state for icon - open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Toggle navbar function (change to opposite state) - set is open to false if click "X" and is open to true if click "Menu"
    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }

    // Use ref to reference mobile menu 
    const mobileNavRef = useRef();

    // Click outside of mobile nav to close
    const closeOpenMenus = useCallback(
      (e) => {
        // If the mobile nav ref property is true, the mobile nav is open is true, and the mobile nav does not have the click in it, set is open to false and close menu
        if (
          mobileNavRef.current &&
          isOpen &&
          !mobileNavRef.current.contains(e.target) // If events target is not inside menu ref, set is open to false
        ) {
          setIsOpen(false);
        }
      },
      [isOpen]
    );

    // Hook to listen for click event outside of mobile nav; when effect runs add handler above
    useEffect(() => {
      document.addEventListener('mousedown', closeOpenMenus);
    }, [closeOpenMenus]);
    
    return (
        <>
            {/* Navbar in view above large */}
            <nav className='flex justify-end'>
                <div className='hidden w-full justify-between lg:flex text-heather-gray-300'>
                    <NavLinks />
                </div>
                {/* Button to open and close navbar in mobile - call toggle navbar when click the icons */}
                <div className='lg:hidden'>
                    <button className='text-heather-gray-300' onClick={toggleNavbar}>
                        {isOpen ? <X /> : <Menu /> }
                    </button>
                </div>
            </nav>
            {/* Mobile view links - close menu if click a link in Nav bar when open or when click outside */}
            {isOpen && (
                <div 
                  ref={mobileNavRef} 
                  className='lg:hidden flex flex-col items-center basis-full text-heather-gray-300' 
                  onClick={() => setIsOpen(false)}
                >
                    <NavLinks />
                </div>
            )}
        </>
    )
  }


