import React, { useState } from 'react'
import Title from './Title'
import { assets, dummyMyBookingsData } from '../../assets/assets'

const ManageBookings = () => {
  const [bookings, setBookings] = useState(dummyMyBookingsData)
  const [filter, setFilter] = useState('all')

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b))
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <Title title="Bookings" subTitle="Manage rental requests" />

      {/* Filters */}
      <div className='flex gap-2 mb-6 flex-wrap'>
        {['all', 'pending', 'confirmed', 'completed'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <div className='bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50'>
        {filtered.map((booking) => (
          <div key={booking._id} className='p-4 flex flex-col sm:flex-row sm:items-center gap-4'>
            <img src={booking.car.image} alt="" className='w-20 h-14 rounded-xl object-cover' />

            <div className='flex-1 min-w-0'>
              <h4 className='font-medium text-gray-800'>{booking.car.brand} {booking.car.model}</h4>
              <p className='text-sm text-gray-400'>
                {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
              </p>
            </div>

            <div className='text-right'>
              <p className='font-semibold text-gray-800'>${booking.price}</p>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700'
                  : booking.status === 'pending' ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>{booking.status}</span>
            </div>

            <div className='flex gap-2'>
              {booking.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(booking._id, 'confirmed')} className='px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90'>
                    Confirm
                  </button>
                  <button onClick={() => updateStatus(booking._id, 'cancelled')} className='px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200'>
                    Cancel
                  </button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <button onClick={() => updateStatus(booking._id, 'completed')} className='px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary/90'>
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className='p-12 text-center text-gray-400'>No {filter} bookings</div>
        )}
      </div>
    </div>
  )
}

export default ManageBookings