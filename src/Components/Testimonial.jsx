import React from 'react'
import Title from './Title'

const testimonials = [
  {
    name: "Donald Jackman",
    role: "Content Creator",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  },
  {
    name: "Richard Nelson",
    role: "Instagram Influencer",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  },
  {
    name: "James Washington",
    role: "Marketing Manager",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

const Testimonial = () => {
  return (
    <div className="pt-14">
      {/* Heading */}
      <div className="flex justify-center mb-22 mt-20">
        <Title
          title="What our customers say"
          subTitle="Discover why discerning travelers choose stayventures for their vacation rentals."
        />
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white 
            shadow-[0px_4px_15px_0px] shadow-black/5 
            transition-all duration-300 ease-out 
            hover:-translate-y-2 hover:shadow-[0px_12px_30px_0px] hover:shadow-black/15"
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full border-4 border-white"
                src={item.img}
                alt={item.name}
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">{item.name}</h1>
                <p className="text-gray-800/80">{item.role}</p>
              </div>
            </div>

            <p className="text-gray-500 px-6 text-center">
              I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
            </p>

            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 22 20" fill="none">
                    <path
                      d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                      fill="#FF532E"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
