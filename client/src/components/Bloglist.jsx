// import React, { useState } from 'react';
// import { blog_data, blogCategories } from '../assets/assets';
// import { motion } from 'framer-motion'; // ✅ Fixed here
// import BlogCard from './BlogCard';
// import { useAppContext } from '../context/AppContext';

// const Bloglist = () => {
//   const [menu, setMenu] = useState("All");
//   const {blogs,input}=useAppContext();
//   const filteredBlogs=()=>{
//     if(input===''){
//       return blogs;
//     }
//     return blogs.filter((blog) =>
//       blog.title.toLowerCase().includes(input.toLowerCase())
//     || blog.category.toLowerCase().includes(input.toLowerCase())
//     );
//   }


    

//   return (
//     <div>
//       {/* Category Buttons */}
//       <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
//         {blogCategories.map((item) => (
//           <div key={item} className='relative'>
//             <button
//               onClick={() => setMenu(item)}
//               className={`relative z-10 cursor-pointer text-gray-500 font-medium transition ${
//                 menu === item ? 'text-white px-5 pt-0.5' : ''
//               }`}
//             >
//               {item}
//               {menu === item && (
//                 <motion.div
//                   layoutId='underline'
//                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   className='absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full'
//                 />
//               )}
//             </button>
//           </div>
//         ))}
//       </div>

//      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
//   {filteredBlogs()
//     .filter((blog) => menu === 'All' || blog.category === menu)
//     .map((blog) => (
//       <BlogCard key={blog._id || blog.id} blog={blog} />
//     ))}
// </div>

//     </div>
//   );
// };

// export default Bloglist;

import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ✅ Step 1: Search filter
  const searchFiltered =
    input.trim() === ""
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(input.toLowerCase()) ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        );

  // ✅ Step 2: Category filter
  const finalBlogs = searchFiltered.filter(
    (blog) => menu === "All" || blog.category === menu
  );

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 cursor-pointer text-gray-500 font-medium transition ${
                menu === item ? "text-white px-5 pt-0.5" : ""
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {finalBlogs.length > 0 ? (
          finalBlogs.map((blog) => (
            <BlogCard key={blog._id || blog.id} blog={blog} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bloglist;
