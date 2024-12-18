'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-2xl font-bold">
          <Link href="/">Resort Reservation</Link>
        </h1>

        {/* Hamburger menu button for mobile */}
        <button
          className="sm:hidden block text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <nav
          className={`sm:flex sm:items-center sm:space-x-6 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <Link href="/" className="block py-2 sm:py-0 hover:text-gray-300">
            Home
          </Link>
          <Link
            href="/reservations"
            className="block py-2 sm:py-0 hover:text-gray-300"
          >
            Reservations
          </Link>
          <Link
            href="/dashboard"
            className="block py-2 sm:py-0 hover:text-gray-300"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
