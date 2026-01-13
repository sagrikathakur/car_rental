import React, { useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [bookings] = useState(dummyMyBookingsData)

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      case 'completed':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className='py-8 px-4 md:px-8 lg:px-16 xl:px-24 min-h-screen'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-900'>My Bookings</h1>
        <p className='text-gray-500 mt-1'>View and manage your car rental reservations</p>
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-6 border-b border-gray-200'>
        {['all', 'pending', 'confirmed', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors relative
              ${activeTab === tab
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab}
            {activeTab === tab && (
              <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'></span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className='text-center py-16'>
          <img src={assets.carIcon} alt="" className='w-16 h-16 mx-auto opacity-30 mb-4' />
          <h3 className='text-lg font-medium text-gray-800 mb-2'>No bookings found</h3>
          <p className='text-gray-500 mb-6'>You haven't made any {activeTab !== 'all' ? activeTab : ''} bookings yet</p>
          <button
            onClick={() => navigate('/cars')}
            className='bg-primary text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-primary-dull transition-colors'
          >
            Browse Cars
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className='border border-gray-200 rounded-lg p-4 md:p-5 hover:border-gray-300 transition-colors'
            >
              <div className='flex flex-col md:flex-row gap-4'>
                {/* Car Image */}
                <div className='w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-100 shrink-0'>
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Booking Details */}
                <div className='flex-1'>
                  <div className='flex flex-wrap items-start justify-between gap-2 mb-3'>
                    <div>
                      <h3 className='font-medium text-gray-900'>
                        {booking.car.brand} {booking.car.model}
                      </h3>
                      <p className='text-sm text-gray-500'>{booking.car.category} • {booking.car.year}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-medium capitalize ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Dates & Location */}
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-4'>
                    <div>
                      <p className='text-gray-500 mb-0.5'>Pick-up</p>
                      <p className='text-gray-800 font-medium'>{formatDate(booking.pickupDate)}</p>
                    </div>
                    <div>
                      <p className='text-gray-500 mb-0.5'>Return</p>
                      <p className='text-gray-800 font-medium'>{formatDate(booking.returnDate)}</p>
                    </div>
                    <div className='col-span-2 sm:col-span-1'>
                      <p className='text-gray-500 mb-0.5'>Location</p>
                      <p className='text-gray-800 font-medium'>{booking.car.location}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100'>
                    <div>
                      <span className='text-gray-500 text-sm'>Total: </span>
                      <span className='text-lg font-semibold text-gray-900'>{currency}{booking.price}</span>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => navigate(`/car-details/${booking.car._id}`)}
                        className='px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors'
                      >
                        View Car
                      </button>
                      {booking.status === 'pending' && (
                        <button className='px-4 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors'>
                          Cancel
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button className='px-4 py-2 text-sm text-white bg-primary rounded hover:bg-primary-dull transition-colors'>
                          Get Directions
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Stats */}
      {bookings.length > 0 && (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-gray-50 rounded-lg p-4 text-center'>
            <p className='text-2xl font-semibold text-gray-900'>{bookings.length}</p>
            <p className='text-sm text-gray-500'>Total Bookings</p>
          </div>
          <div className='bg-green-50 rounded-lg p-4 text-center'>
            <p className='text-2xl font-semibold text-green-700'>
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
            <p className='text-sm text-gray-500'>Confirmed</p>
          </div>
          <div className='bg-yellow-50 rounded-lg p-4 text-center'>
            <p className='text-2xl font-semibold text-yellow-700'>
              {bookings.filter(b => b.status === 'pending').length}
            </p>
            <p className='text-sm text-gray-500'>Pending</p>
          </div>
          <div className='bg-blue-50 rounded-lg p-4 text-center'>
            <p className='text-2xl font-semibold text-blue-700'>
              {currency}{bookings.reduce((sum, b) => sum + b.price, 0)}
            </p>
            <p className='text-sm text-gray-500'>Total Spent</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings