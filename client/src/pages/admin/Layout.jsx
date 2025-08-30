import React from 'react'
import { Outlet} from 'react-router-dom'
import {assets} from '../../assets/assets'
import Sidebar from '../../components/Admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
    
    
    const {axios,setToken,navigate}=useAppContext();

    const logout = () => {
  localStorage.removeItem("token");
  setToken(null);   // context state bhi reset
  delete axios.defaults.headers.common['Authorization'];
  navigate('/');
};

  return (
    <>
      <div className='flex item-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.logo}  className='w-32 sm:w-44 cursor-pointer' 
        onClick={()=>navigate('/')}/>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet />
      </div>
    </>
  )
}

export default Layout
