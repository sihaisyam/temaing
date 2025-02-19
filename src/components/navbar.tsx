'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Menu Utama */}
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold">TEM aing</div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Menu Utama */}
                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  User
                </Link>
                <Link href="/room" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Room
                </Link>
                {/* Dropdown untuk Transaction */}
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                  >
                    Transaction
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <Link href="/transaction/booking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Booking
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown Account (Rata Kanan) */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
              >
                <img
                  src="https://fastly.picsum.photos/id/5/5000/3334.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc" // Ganti dengan URL gambar profil Anda
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>Account</span>
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Change Password
                  </Link>
                  <Link href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}