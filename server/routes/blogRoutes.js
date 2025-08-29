// routes/blogRoutes.js
import express from 'express';
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import { generateContent } from '../controllers/blogController.js';
const blogRoutes = express.Router();

blogRoutes.post('/add', auth, upload.single('image'), addBlog); // ✅ auth first
blogRoutes.get('/all', getAllBlogs);
blogRoutes.get('/:id', getBlogById);
blogRoutes.post('/delete', auth, deleteBlogById);
blogRoutes.post('/toggle-publish', auth, togglePublish);
blogRoutes.post('/add-comment', addComment);
blogRoutes.get('/comments/:id', getBlogComments);
blogRoutes.post('/generate-content',auth,generateContent);

export default blogRoutes;
