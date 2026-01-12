import React from 'react'
import { assets } from '../assets/assets'


const Banner = () => {
  return (
    <div className='bg-[#F1F5F9] h-100 mt-10 pt-16'>
      <div className='flex flex-col md:flex-row md:items-center items-center justify-between px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>

        <div className='text-white max-w-[430px]'>
          <h2 className='text-3xl font-medium'>
            Do you own a luxury car?
          </h2>

          <p className='mt-2'>
            Monetize your car with our car rental platform
          </p>

          <p className='mt-2 text-sm text-white/90'>
            We take care of insurance, driver verification and secure payments
            so you can earn passive income, stress-free.
          </p>

          <button className='mt-5 px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm cursor-pointer'>
            List your car
          </button>
        </div>

        <img
          src={assets.banner_car_image}
          alt=""
          className='max-h-[180px] md:max-h-[240px] mt-8 md:mt-0'
        />
      </div>
    </div>
  )
}

export default Banner
