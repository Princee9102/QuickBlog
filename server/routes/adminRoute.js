// import express from 'express';
// // import { adminlogin } from '../controllers/adminController.js';
// import auth from '../middleware/auth.js';
// import {adminlogin,getAllComments,getAllBlogsAdmin,deleteCommentById,approveCommentById,getDashboard } from '../controllers/adminController.js';

// const adminRoute=express.Router();

// adminRoute.post('/login',adminlogin);
// adminRoute.get("/comments",auth,getAllComments);
// adminRoute.get("/blogs",auth,getAllBlogsAdmin);
// adminRoute.post("/delete-comment",auth,deleteCommentById);
// adminRoute.post("/approve-comment",auth,approveCommentById);
// adminRoute.get("/dashboard",auth,getDashboard);

// export default adminRoute;


import express from 'express';
import auth from '../middleware/auth.js';


import {
  adminlogin,
  getAllComments,
  getAllBlogsAdmin,
  deleteCommentById,
  approveCommentById,
  getDashboard
} from '../controllers/adminController.js';

const adminRoute = express.Router();

// --------------------- Admin Login ---------------------
adminRoute.post('/login', adminlogin);

// --------------------- Middleware for Admin Routes ---------------------
// Apply auth middleware first, then check admin role
const adminAuth = [auth, (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.json({ message: 'Admin access required' });
  }
  next();
}];

// --------------------- Admin Routes ---------------------
adminRoute.get('/comments', auth, getAllComments);
adminRoute.get('/blogs', auth, getAllBlogsAdmin);

// adminRoute.post('/comments/:id', auth, deleteCommentById);
// adminRoute.post('/comments/:id/approve', auth, approveCommentById);
adminRoute.delete('/comments/:id', auth, deleteCommentById);
adminRoute.post('/comments/:id/approve', auth, approveCommentById);


adminRoute.get('/dashboard', auth, getDashboard);

export default adminRoute;
