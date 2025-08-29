import React from 'react'
import{ assets, footer_data }from '../assets/assets'
const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/65'>
      <div className='flex flex-col md:flex-row justify-between items-start gap-10 py-10 border-b border-gray-500'>
        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, pariatur!</p>
        </div>
    <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
        {footer_data.map((section,index)=>(
            
            <div key={index}>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                <ul className='text-sm space-y-1'>
                    {section.links.map((link, i) => (
                        <li key={i}>
                            <a href='#' className='hover:underline transition'>{link}</a>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        
    </div>

      </div>


      <p className="text-center text-sm text-gray-500 py-4">
        &copy; 2025 QuickBlog. All rights reserved.
    </p>

    </div>
  )
}

export default Footer
