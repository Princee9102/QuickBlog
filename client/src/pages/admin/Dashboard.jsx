

import React, { useEffect, useState } from 'react';
import { dashboard_data } from '../../assets/assets';
import assets from '../../assets/assets';
import BlogTableItem from '../../components/Admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

import toast from 'react-hot-toast';
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    draft: 0,
    recentBlogs: [],
  });

  const {axios}=useAppContext();

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Using token:", token);

    const { data } = await axios.get("/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const { data } = await axios.get("/api/admin/dashboard");


    console.log("Dashboard API response:", data);

    data.success
      ? setDashboardData(data.dashboardData)
      : toast.error(data.message);
  } catch (error) {
    
    toast.error(error.response?.data?.message || error.message);
  }
};




//   const fetchDashboardData = async () => {
//   try {
//     const token = localStorage.getItem("token"); // login ke baad yahi save hota hai
//     const { data } = await axios.get("/api/admin/dashboard", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     data.success
//       ? setDashboardData(data.dashboardData)
//       : toast.error(data.message);
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message);
//   }
// };

  // const fetchDashboardData = async () => {
  //    // simulate API call
  //    try{
      
  //     const {data}=await axios.get('/api/admin/dashboard');
  //     data.success? setDashboardData(data.dashboardData):toast.error(data.message);
  //    }catch(error){
       
  //     toast.error(error.message);
  //    }
  // };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {/* Stat Cards */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 shadow-md cursor-pointer rounded-lg hover:shadow-lg transition-all'>
          <img src={assets.dashboard_icon_1} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 shadow-md cursor-pointer rounded-lg hover:shadow-lg transition-all'>
          <img src={assets.dashboard_icon_2} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 shadow-md cursor-pointer rounded-lg hover:shadow-lg transition-all'>
          <img src={assets.dashboard_icon_3} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.draft}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs */}
      <div>
        <div className='flex items-center gap-4 bg-white p-4 mt-6 shadow-md rounded-lg'>
          <img src={assets.dashboard_icon_4} alt='' />
          <p className='text-lg font-semibold text-gray-600'>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
