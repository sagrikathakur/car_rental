import React, { useState } from 'react'
import { assets, dummyUserData } from '../../assets/assets'
import { Link } from 'react-router-dom';

const NavbarOwner = () => {
  const user = dummyUserData;
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className='flex items-center justify-between px-4 md:px-8 py-3 bg-white border-b border-gray-200 sticky top-0 z-50'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <img src={assets.logo} alt="CarRental" className='h-6' />
      </Link>

      {/* Right Section */}
      <div className='flex items-center gap-3'>
        {/* Search Bar - Hidden on mobile */}
        <div className='hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 gap-2'>
          <img src={assets.search_icon} alt="" className='w-4 h-4 opacity-50' />
          <input
            type="text"
            placeholder="Search..."
            className='bg-transparent outline-none text-sm w-40 placeholder:text-gray-400'
          />
        </div>

        {/* Notifications */}
        <div className='relative'>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className='w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-gray-600' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {showNotifications && (
            <div className='absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50'>
              <div className='px-4 py-2 border-b border-gray-100'>
                <h4 className='font-semibold text-gray-800'>Notifications</h4>
              </div>
              <div className='max-h-64 overflow-y-auto'>
                <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-2 border-primary'>
                  <p className='text-sm text-gray-800'>New booking request received</p>
                  <p className='text-xs text-gray-400 mt-1'>2 minutes ago</p>
                </div>
                <div className='px-4 py-3 hover:bg-gray-50 cursor-pointer'>
                  <p className='text-sm text-gray-600'>Booking #1234 confirmed</p>
                  <p className='text-xs text-gray-400 mt-1'>1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className='relative'>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1.5 pr-3 transition-colors'
          >
            <img
              src={user?.image || "https://via.placeholder.com/40"}
              alt={user?.name}
              className='w-8 h-8 rounded-full object-cover ring-2 ring-gray-100'
            />
            <div className='hidden sm:block text-left'>
              <p className='text-sm font-medium text-gray-800 leading-tight'>{user?.name}</p>
              <p className='text-xs text-gray-400'>Owner</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className='absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <p className='font-medium text-gray-800'>{user?.name}</p>
                <p className='text-sm text-gray-400 truncate'>{user?.email}</p>
              </div>

              <div className='py-1'>
                <Link to="/owner" className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className='text-sm'>Dashboard</span>
                </Link>

                <Link to="/owner/add-car" className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className='text-sm'>Add New Car</span>
                </Link>

                <Link to="/owner/manage-cars" className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className='text-sm'>My Cars</span>
                </Link>

                <Link to="/owner/manage-bookings" className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className='text-sm'>Bookings</span>
                </Link>
              </div>

              <div className='border-t border-gray-100 py-1'>
                <button className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors w-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className='text-sm'>Settings</span>
                </button>

                <button className='flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors w-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className='text-sm'>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(showMenu || showNotifications) && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => { setShowMenu(false); setShowNotifications(false); }}
        />
      )}
    </div>
  )
}

export default NavbarOwner