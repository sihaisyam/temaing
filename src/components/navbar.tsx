'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  // Cek status login saat komponen dimount
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (accessToken) {
      setIsLoggedIn(true);
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUserData(null);
    
    // Tutup dropdown
    setIsAccountDropdownOpen(false);
    
    // Redirect ke halaman login
    router.push('/login');
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
                {isLoggedIn ? ( 
                  <>
                    <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link href="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      User
                    </Link>
                    <Link href="/rooms" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
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
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <Link 
                            href="/transaction/booking" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Booking
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Blog
                    </Link>
                    <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      About
                    </Link>
                    <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Contact
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Dropdown Account (Rata Kanan) */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={toggleAccountDropdown} 
                  className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                >
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                      <span className="text-white text-xs">
                        {userData?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <span>{userData?.firstName || 'Account'}</span>
                </button>
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/change-password" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Change Password
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </Link>
                <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}