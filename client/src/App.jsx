import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import Comment from './pages/admin/Comment';
import ListBlog from './pages/admin/ListBlog';
import Login from './components/Admin/Login';
import 'quill/dist/quill.snow.css'; // Import Quill styles if using Quill for rich text editing
import {Toaster} from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

function App() {
  const {token}=useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />

        {/* Capitalized Route for nested admin routes */}
        <Route path='/admin' element={token ?<Layout />:<Login/>}>
        {/* Login route (exact path) */}
          {/* <Route path='/admin' element={<Login />} /> */}

          {/* Admin layout routes after login */}
          {/* <Route path='/admin/dashboard' element={<Layout />}> */}


        
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='listBlog' element={<ListBlog />} /> {/* fixed: should not reuse AddBlog */}
          <Route path='comment' element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
