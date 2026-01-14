import React, { useState } from 'react'
import Title from './Title'
import { assets, cityList } from '../../assets/assets'

const AddCar = () => {
  const [images, setImages] = useState([null, null, null, null])
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    category: '',
    seating_capacity: '',
    fuel_type: '',
    transmission: '',
    pricePerDay: '',
    location: '',
    description: ''
  })

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData, images)
  }

  const categories = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van']
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
  const transmissions = ['Automatic', 'Manual', 'Semi-Automatic']

  return (
    <div className='p-4 md:p-6 lg:p-8 max-w-4xl'>
      <Title title="Add New Car" subTitle="List your vehicle for rental" />

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Image Upload Section */}
        <div className='bg-white rounded-2xl border border-gray-100 p-5'>
          <h3 className='font-medium text-gray-800 mb-4'>Vehicle Photos</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {images.map((img, index) => (
              <label key={index} className='cursor-pointer group'>
                <div className={`aspect-square rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all
                  ${img ? 'border-primary' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                  {img ? (
                    <img src={URL.createObjectURL(img)} alt="" className='w-full h-full object-cover' />
                  ) : (
                    <div className='text-center p-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 mx-auto text-gray-300 group-hover:text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className='text-xs text-gray-400 mt-2'>{index === 0 ? 'Main' : `Photo ${index + 1}`}</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(index, e.target.files[0])} />
              </label>
            ))}
          </div>
          <p className='text-xs text-gray-400 mt-3'>Upload up to 4 photos. First image will be the main display.</p>
        </div>

        {/* Basic Details */}
        <div className='bg-white rounded-2xl border border-gray-100 p-5'>
          <h3 className='font-medium text-gray-800 mb-4'>Basic Details</h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Toyota"
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., Camry"
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                min="1990"
                max="2026"
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className='bg-white rounded-2xl border border-gray-100 p-5'>
          <h3 className='font-medium text-gray-800 mb-4'>Specifications</h3>
          <div className='grid md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Seats</label>
              <input
                type="number"
                name="seating_capacity"
                value={formData.seating_capacity}
                onChange={handleChange}
                placeholder="5"
                min="2"
                max="12"
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Fuel Type</label>
              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
                required
              >
                <option value="">Select fuel</option>
                {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
              </select>
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
                required
              >
                <option value="">Select type</option>
                {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Location */}
        <div className='bg-white rounded-2xl border border-gray-100 p-5'>
          <h3 className='font-medium text-gray-800 mb-4'>Pricing & Location</h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Price per Day</label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>$</span>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  placeholder="150"
                  min="1"
                  className='w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-1.5'>Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
                required
              >
                <option value="">Select city</option>
                {cityList.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm text-gray-600 mb-1.5'>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your car, its features, and condition..."
              className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none'
              required
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className='flex items-center gap-3'>
          <button
            type="submit"
            className='px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors'
          >
            Add Car
          </button>
          <button
            type="button"
            className='px-6 py-2.5 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCar