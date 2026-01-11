import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${align === "left" ? "md:items-start md:text-left" : ""
        }`}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {subTitle && <p className="text-gray-500 mt-2">{subTitle}</p>}
    </div>
  )
}

export default Title
