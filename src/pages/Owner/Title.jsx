import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <div className='mb-6'>
      <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{title}</h1>
      {subTitle && <p className='text-gray-500 mt-1'>{subTitle}</p>}
    </div>
  )
}

export default Title