import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useRef } from 'react';
// import { onSubmitHandler } from '../utils/formHandlers';

const Header = () => {
  const {setInput,input}=useAppContext();
  const inputRef=useRef();
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
     console.log("Search input:", inputRef.current.value);
    setInput(inputRef.current.value);
  }

  const onClear=()=>{
    setInput("");
    inputRef.current.value="";
  }
  return (
    <div className="relative pt-28 text-center px-6 sm:px-12 xl:px-24">

      {/* Gradient background */}
      {/* <img 
        src={assets.gradientBackground} 
        alt="gradient background" 
        className="absolute inset-0 -z-10 opacity-50 w-full h-full object-cover" 
      /> */}

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-primary/10 text-sm text-primary justify-center mx-auto cursor-pointer">
        <p>New: AI feature integrated</p>
        <img src={assets.star_icon} className="w-3" alt="star icon" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-6xl font-semibold leading-tight text-gray-800">
        Your own <span className="text-primary">blogging</span><br />platform.
      </h1>

      {/* Subtext */}
      <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
        This is your space to think out loud, to share what matters, and to write without filters.
        Whether it's one word or a thousand, your story starts right here.
      </p>

      {/* Search Form */}
      <form onSubmit={onSubmitHandler} className="mt-8 flex justify-center items-center gap-4">
        <input ref={inputRef}
          type="text"
          placeholder="Search for blogs"
          className="px-4 py-2 w-64 sm:w-80 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button
          type="submit"
          className="px-8 py-2 bg-primary text-white  m-1.5 cursor-pointer text-sm rounded-full hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>
      <div className='text-center mt-4'>
        {
        input &&<button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-sm cursor-pointer'>Clear Search</button>
        }
      </div>
      <img src={assets.gradientBackground} alt="gradient background" className="absolute inset-0 -z-10 opacity-50 w-full h-full object-cover" />
    </div>
  );
};

export default Header;


