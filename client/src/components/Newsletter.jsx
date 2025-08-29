import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-3xl font-semibold text-gray-800'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>
        Subscribe to our newsletter and stay updated with the latest blogs and news. 
      </p>
      <form className='flex justify-center items-center gap-2 mt-4 h-12 w-full max-w-3xl px-4'>
        <input
          className='border border-gray-600 h-full outline-none w-full px-3 text-gray-800 rounded-l-md'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='md:px-12 px-8 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all h-full rounded-r-md'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
