import React, { useState } from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../../assets/assets'
import { Link } from 'react-router-dom'

const ManageCars = () => {
  const [cars, setCars] = useState(dummyCarData)

  const toggleAvailability = (id) => {
    setCars(cars.map(car =>
      car._id === id ? { ...car, isAvaliable: !car.isAvaliable } : car
    ))
  }

  const deleteCar = (id) => {
    if (window.confirm('Delete this car?')) {
      setCars(cars.filter(car => car._id !== id))
    }
  }

  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <div className='flex items-center justify-between mb-6'>
        <Title title="My Cars" subTitle={`${cars.length} vehicles`} />
        <Link to='/owner/add-car' className='flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90'>
          + Add Car
        </Link>
      </div>

      <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        {cars.map((car) => (
          <div key={car._id} className='bg-white rounded-2xl border border-gray-100 overflow-hidden group'>
            <div className='relative aspect-[16/10] overflow-hidden'>
              <img src={car.image} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium ${car.isAvaliable ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-white'}`}>
                {car.isAvaliable ? 'Available' : 'Unavailable'}
              </span>
              <span className='absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 text-gray-800'>
                ${car.pricePerDay}/day
              </span>
            </div>
            <div className='p-4'>
              <h3 className='font-semibold text-gray-800'>{car.brand} {car.model}</h3>
              <p className='text-sm text-gray-400 mb-3'>{car.year} • {car.category}</p>
              <div className='flex items-center gap-3 text-xs text-gray-500 mb-4'>
                <span>{car.fuel_type}</span>•<span>{car.seating_capacity} seats</span>•<span>{car.location}</span>
              </div>
              <div className='flex gap-2 pt-3 border-t border-gray-100'>
                <button onClick={() => toggleAvailability(car._id)} className='flex-1 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20'>
                  {car.isAvaliable ? 'Set Unavailable' : 'Set Available'}
                </button>
                <button onClick={() => deleteCar(car._id)} className='p-2 text-red-500 hover:bg-red-50 rounded-lg'>
                  <img src={assets.delete_icon} className='w-4 h-4' alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageCars