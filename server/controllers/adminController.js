

import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";


// ========================
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate JWT token with 1-hour expiry
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return res.json({ success: true, message: "Login successful", token });
    }

    return res.json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.json({ success: false, message: "Something went wrong in fetching blogs", error: error.message });
  }
};

// ========================
// Get All Comments
// ========================
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================
// Get Dashboard Stats
// ========================
// ========================
// Get Dashboard Stats
// ========================
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    res.json({
      success: true,
      dashboardData: {
        recentBlogs,
        blogs,
        comments,
        drafts
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const getDashboard = async (req, res) => {
//   try {
//     const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
//     const blogs = await Blog.countDocuments();
//     const comments = await Comment.countDocuments();
//     const drafts = await Blog.countDocuments({ isPublished: false });

//     res.json({ success: true, recentBlogs, blogs, comments, drafts });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// ========================
// Delete Comment by ID
// ========================
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.json({ success: false, message: "Comment ID is required" });

    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) return res.json({ success: false, message: "Comment not found" });

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ========================
// Approve Comment by ID
// ========================
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.json({ success: false, message: "Comment ID is required" });

    const updatedComment = await Comment.findByIdAndUpdate(id, { isApproved: true }, { new: true });
    if (!updatedComment) return res.json({ success: false, message: "Comment not found" });

    res.json({ success: true, message: "Comment approved successfully", comment: updatedComment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

