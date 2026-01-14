import React from 'react'
import Title from './Title'
import { dummyDashboardData } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const data = dummyDashboardData

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <Title title="Dashboard" subTitle="Overview of your business" />

      {/* Simple Stats Row */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <p className='text-sm text-gray-500'>Total Cars</p>
          <p className='text-2xl font-semibold mt-1'>{data.totalCars}</p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <p className='text-sm text-gray-500'>Bookings</p>
          <p className='text-2xl font-semibold mt-1'>{data.totalBookings}</p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <p className='text-sm text-gray-500'>Pending</p>
          <p className='text-2xl font-semibold mt-1 text-amber-600'>{data.pendingBookings}</p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <p className='text-sm text-gray-500'>Revenue</p>
          <p className='text-2xl font-semibold mt-1 text-green-600'>${data.monthlyRevenue}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className='bg-white rounded-xl border border-gray-200'>
        <div className='flex items-center justify-between p-4 border-b border-gray-100'>
          <h2 className='font-semibold'>Recent Bookings</h2>
          <Link to='/owner/manage-bookings' className='text-sm text-primary'>View all</Link>
        </div>

        <div className='divide-y divide-gray-100'>
          {data.recentBookings.map((booking, i) => (
            <div key={i} className='flex items-center gap-4 p-4'>
              <img src={booking.car.image} alt="" className='w-14 h-10 rounded-lg object-cover' />
              <div className='flex-1'>
                <p className='font-medium'>{booking.car.brand} {booking.car.model}</p>
                <p className='text-sm text-gray-400'>
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </p>
              </div>
              <div className='text-right'>
                <p className='font-medium'>${booking.price}</p>
                <span className={`text-xs ${booking.status === 'confirmed' ? 'text-green-600' : 'text-amber-600'}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard