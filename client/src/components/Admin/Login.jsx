// import React from 'react'

// const Login = () => {
//   const handleSubmit = async(e)=> {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Login form submitted");
//     // Redirect to admin dashboard or show error message
//     // For example, you can use react-router's useNavigate hook to redirect
//     // navigate('/admin/dashboard'); (if using react-router)
//   }
//   return (
//     <div className='flex justify-center items-center h-screen bg-gray-100'>
//       <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 rounded-lg 
//       shadow-xl-primary/15 bg-white shadow'>
//         <div className='flex flex-col items-center justify-center '>
//             <div className='w-full py-6 text-center'>

//                 <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span>Login</h1>
//                 <p className='font-light'>Enter your credentials to access the admin panel</p>
//             </div>
//             <form onSubmit={handleSubmit}>
//               <div className='flex flex-col '>
//                 <label>Email</label>
//                 <input type="email" required placeholder='Enter your email 'className='border-b-2 border-gray-300 p-2 outline-none mb-6'/>

//               </div>
//             </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
 

// import React, { useState } from 'react';
// import { useActionData, useNavigate } from 'react-router-dom';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const {axios,token}=useAppContext();
  
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//     const {data}=await axios.post('/api/v1/admin/login',{email,password});
//     if(data.success){
//       setToken(data.token);
//       localStorage.setItem("token",data.token);
//       axios.defaults.headers.common['Authorization']=`Bearer ${data.token}`;
//     }
//     else{
//       toast.error(data.message);
//     }
//   }
//   catch(error){
//     toast.error(error.message);
//   }
//     console.log("Login form submitted");
//     console.log("Email:", email);
//     console.log("Password:", password);

//     // TODO: Add your login logic here

//     // Navigate to dashboard after login
//     navigate('/admin/dashboard');
//   };

//   return (
//     <div className='flex justify-center items-center h-screen bg-gray-100'>
//       <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 rounded-lg shadow bg-white'>
//         <div className='flex flex-col items-center justify-center'>
//           <div className='w-full py-6 text-center'>
//             <h1 className='text-3xl font-bold'>
//               <span className='text-primary'>Admin</span> Login
//             </h1>
//             <p className='font-light'>Enter your credentials to access the admin panel</p>
//           </div>
//           <form onSubmit={handleSubmit} className='w-full mt-6 sm:max-w-md text-gray-700'>
//             <div className='flex flex-col mb-4'>
//               <label>Email</label>
//               <input
//                 type="email"
//                 required
//                 placeholder='Enter your email'
//                 className='border-b-2 border-gray-300 p-2 outline-none'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className='flex flex-col mb-6'>
//               <label>Password</label>
//               <input
//                 type="password"
//                 required
//                 placeholder='Enter your password'
//                 className='border-b-2 border-gray-300 p-2 outline-none'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               className='w-full font-medium  bg-primary text-white py-2 rounded hover:bg-primary/90 transition-all'
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext(); // ✅ setToken include kiya
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        // ✅ Token set + localStorage + axios header
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] =data.token;
       

      
      const token = authHeader.split(" ")[1]; // "Bearer <token>" assume kiya hua hai


        toast.success("Login successful!");
       
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 rounded-lg shadow bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-6 sm:max-w-md text-gray-700"
          >
            <div className="flex flex-col mb-4">
              <label>Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="border-b-2 border-gray-300 p-2 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="border-b-2 border-gray-300 p-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full font-medium bg-primary text-white py-2 rounded hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
