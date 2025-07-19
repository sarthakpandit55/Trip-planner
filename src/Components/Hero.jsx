import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-50 gap-9'>
      <h1 className=' text-4xl font-bold text-center mt-20'>
        <span className='text-emerald-400'>Discover Your Next Adventure with AI : </span>
         <br />  Personalized Trip Planner.</h1>
      <p className='text-xl text-center text-gray-400 '>Your Personal trip planner and curator, creating custom itineraries tailored to your intrest and budget.</p>
      <Link to="/create-trip">
      <button>Get Started!</button>
      </Link>
    </div>
  )
}

export default Hero
