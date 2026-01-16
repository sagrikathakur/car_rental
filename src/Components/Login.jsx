import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign In')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, just log the data and close the modal
    console.log('Form submitted:', formData)
    // In a real app, you would call your API here
    setShowLogin(false)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-[100]'>
      <form onSubmit={handleSubmit} className='relative bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl animate-fadeIn'>
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors'
        >
          <img src={assets.close_icon} alt="Close" className='w-5 h-5' />
        </button>

        {/* Header */}
        <div className='text-center mb-8'>
          <img src={assets.logo} alt="CarRental" className='h-8 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-gray-800'>{currState}</h2>
          <p className='text-gray-500 text-sm mt-1'>
            {currState === 'Sign In' ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'}
          </p>
        </div>

        {/* Form Inputs */}
        <div className='space-y-4'>
          {currState === 'Sign Up' && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
            />
          </div>
        </div>

        {/* Forgot Password */}
        {currState === 'Sign In' && (
          <div className='text-right mt-2'>
            <button type="button" className='text-sm text-primary hover:underline'>
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className='w-full mt-6 py-3 bg-primary hover:bg-primary-dull text-white font-medium rounded-lg transition-colors'
        >
          {currState === 'Sign In' ? 'Sign In' : 'Create Account'}
        </button>

        {/* Divider */}
        <div className='relative my-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-200'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-4 bg-white text-gray-400'>or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className='flex gap-4'>
          <button
            type="button"
            className='flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <img src={assets.gmail_logo} alt="Google" className='w-5 h-5' />
            <span className='text-sm text-gray-600'>Google</span>
          </button>
          <button
            type="button"
            className='flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <img src={assets.facebook_logo} alt="Facebook" className='w-5 h-5' />
            <span className='text-sm text-gray-600'>Facebook</span>
          </button>
        </div>

        {/* Toggle State */}
        <p className='text-center mt-6 text-gray-500 text-sm'>
          {currState === 'Sign In' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setCurrState(currState === 'Sign In' ? 'Sign Up' : 'Sign In')}
            className='text-primary font-medium hover:underline'
          >
            {currState === 'Sign In' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
