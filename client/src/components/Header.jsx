import React from 'react'
import Logo from './Logo';
import Nav from './Nav';
import { useSelector } from 'react-redux';


export default function Header() {
  return (
    // Display logo and Nav
    <header className="sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-8 bg-cinder-950">
        <Logo />
          <div>
          </div>
        <Nav />
    </header>
  )
}
