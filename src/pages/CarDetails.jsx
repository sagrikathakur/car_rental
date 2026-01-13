import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'

const CarDetails = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '10:00',
    returnTime: '10:00',
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    const foundCar = dummyCarData.find(c => c._id === id.trim())
    setCar(foundCar)
    setLoading(false)
  }, [id])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    // Add booking logic here
  }

  // Calculate rental days and total
  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate)
      const returnD = new Date(formData.returnDate)
      const diff = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24))
      return diff > 0 ? diff : 1
    }
    return 1
  }

  const rentalDays = calculateDays()
  const subtotal = car ? car.pricePerDay * rentalDays : 0
  const serviceFee = 25
  const total = subtotal + serviceFee

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent'></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 px-4'>
        <h2 className='text-xl font-medium text-gray-800'>Car not found</h2>
        <button
          onClick={() => navigate('/cars')}
          className='text-primary hover:underline'
        >
          ← Back to all cars
        </button>
      </div>
    )
  }

  return (
    <div className='py-8 px-4 md:px-8 lg:px-16 xl:px-24'>
      {/* Breadcrumb */}
      <div className='text-sm text-gray-500 mb-6'>
        <span onClick={() => navigate('/')} className='hover:text-primary cursor-pointer'>Home</span>
        <span className='mx-2'>›</span>
        <span onClick={() => navigate('/cars')} className='hover:text-primary cursor-pointer'>Cars</span>
        <span className='mx-2'>›</span>
        <span className='text-gray-900'>{car.brand} {car.model}</span>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Side - Car Details */}
        <div className='lg:w-[60%]'>
          {/* Car Image */}
          <div className='relative rounded-lg overflow-hidden mb-6'>
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className='w-full h-[300px] md:h-[400px] object-cover'
            />
            {car.isAvaliable && (
              <span className='absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded'>
                Available
              </span>
            )}
          </div>

          {/* Car Title */}
          <div className='mb-6'>
            <p className='text-sm text-gray-500 mb-1'>{car.category} • {car.year}</p>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-900'>
              {car.brand} {car.model}
            </h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.location_icon} alt="" className='w-4 h-4 opacity-60' />
              <span className='text-gray-600 text-sm'>{car.location}</span>
            </div>
          </div>

          {/* Price */}
          <div className='flex items-baseline gap-1 mb-8 pb-6 border-b border-gray-200'>
            <span className='text-3xl font-bold text-primary'>{currency}{car.pricePerDay}</span>
            <span className='text-gray-500'>/day</span>
          </div>

          {/* Specifications */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>Specifications</h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='border border-gray-200 rounded-lg p-4 text-center'>
                <img src={assets.users_icon} alt="" className='w-5 h-5 mx-auto mb-2 opacity-70' />
                <p className='text-sm text-gray-500'>Seats</p>
                <p className='font-medium'>{car.seating_capacity}</p>
              </div>
              <div className='border border-gray-200 rounded-lg p-4 text-center'>
                <img src={assets.fuel_icon} alt="" className='w-5 h-5 mx-auto mb-2 opacity-70' />
                <p className='text-sm text-gray-500'>Fuel</p>
                <p className='font-medium'>{car.fuel_type}</p>
              </div>
              <div className='border border-gray-200 rounded-lg p-4 text-center'>
                <img src={assets.carIcon} alt="" className='w-5 h-5 mx-auto mb-2 opacity-70' />
                <p className='text-sm text-gray-500'>Transmission</p>
                <p className='font-medium'>{car.transmission}</p>
              </div>
              <div className='border border-gray-200 rounded-lg p-4 text-center'>
                <img src={assets.calendar_icon_colored} alt="" className='w-5 h-5 mx-auto mb-2 opacity-70' />
                <p className='text-sm text-gray-500'>Year</p>
                <p className='font-medium'>{car.year}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-3'>About this car</h2>
            <p className='text-gray-600 leading-relaxed'>{car.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>Features</h2>
            <div className='flex flex-wrap gap-3'>
              {['AC', 'Bluetooth', 'GPS', 'USB Port', 'Backup Camera', 'Cruise Control'].map((feature, i) => (
                <span key={i} className='bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm'>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Booking Form */}
        <div className='lg:w-[40%]'>
          <div className='border border-gray-200 rounded-lg p-6 sticky top-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-6'>Book this car</h3>

            <form onSubmit={handleSubmit}>
              {/* Dates */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <label className='block text-sm text-gray-600 mb-1.5'>Pick-up Date</label>
                  <input
                    type='date'
                    name='pickupDate'
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary'
                  />
                </div>
                <div>
                  <label className='block text-sm text-gray-600 mb-1.5'>Pick-up Time</label>
                  <select
                    name='pickupTime'
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary bg-white'
                  >
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mb-6'>
                <div>
                  <label className='block text-sm text-gray-600 mb-1.5'>Return Date</label>
                  <input
                    type='date'
                    name='returnDate'
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary'
                  />
                </div>
                <div>
                  <label className='block text-sm text-gray-600 mb-1.5'>Return Time</label>
                  <select
                    name='returnTime'
                    value={formData.returnTime}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary bg-white'
                  >
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className='border-t border-gray-200 pt-6 mb-4'>
                <p className='text-sm font-medium text-gray-800 mb-4'>Your Details</p>

                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-1.5'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='John Doe'
                    required
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary'
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-sm text-gray-600 mb-1.5'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='john@email.com'
                    required
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary'
                  />
                </div>

                <div className='mb-6'>
                  <label className='block text-sm text-gray-600 mb-1.5'>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='+1 234 567 8900'
                    required
                    className='w-full px-3 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary'
                  />
                </div>
              </div>

              {/* Price Summary */}
              <div className='bg-gray-50 rounded-lg p-4 mb-6'>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-600'>{currency}{car.pricePerDay} × {rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
                  <span className='text-gray-900'>{currency}{subtotal}</span>
                </div>
                <div className='flex justify-between text-sm mb-3'>
                  <span className='text-gray-600'>Service fee</span>
                  <span className='text-gray-900'>{currency}{serviceFee}</span>
                </div>
                <div className='border-t border-gray-200 pt-3 flex justify-between'>
                  <span className='font-medium text-gray-900'>Total</span>
                  <span className='font-semibold text-gray-900'>{currency}{total}</span>
                </div>
              </div>

              <button
                type='submit'
                className='w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary-dull transition-colors'
              >
                Confirm Booking
              </button>
            </form>

            <p className='text-xs text-gray-500 text-center mt-4'>
              Free cancellation within 24 hours of booking
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails