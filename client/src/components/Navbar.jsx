



import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate(); // correct way
  const { token } = useAppContext(); // only token comes from context

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-indigo-700 transition duration-300"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;















// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';

// const Navbar = () => {
//   const {navigate,token }= useAppContext();

//   return (
//     <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
//       <img
//         onClick={() => navigate('/')}
//         src={assets.logo}
//         alt="logo"
//         className="w-32 sm:w-44 cursor-pointer"
//       />

//       <button
//         onClick={() => navigate('/admin')}
//         className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm shadow-md hover:bg-indigo-700 transition duration-300"
//       >
//         {token ? 'Dashboard' : 'Login'}
//         <img src={assets.arrow} alt="arrow" className="w-3" />
//       </button>
//     </div>
//   );
// };

// export default Navbar;
