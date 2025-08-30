import React from 'react'
import assets from '../../assets/assets'
import { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets'; // assuming comments_data is an array of comments
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comment,fetchComments}) => {
    const{blog,createdAt,_id}=comment;
    const BlogDate=new Date(createdAt);

    const {axios}= useAppContext();

    const approveComment = async () => {
  try {
    const { data } = await axios.post(`/api/admin/comments/${_id}/approve`);
    if (data.success) {
      toast.success(data.message);
      fetchComments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const deleteComment = async () => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    const { data } = await axios.delete(`/api/admin/comments/${_id}`);
    if (data.success) {
      toast.success(data.message);
      fetchComments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


    // const approveComment=async()=>{
    //   try{
    //     const {data}=await axios.post(`/api/admin/approve-comment`,{id:_id});
    //     if(data.success){
    //       toast.success(data.message);
    //       fetchComments();
    //     }
    //     else{
    //       toast.error(data.message);
    //     }
    //   }catch(error){
    //     toast.error(error.message); 
    //   }
    // }

    //  const deleteComment=async()=>{
    //   try{
    //     const confirm=window.confirm("Are you sure you want to delete this comment?");
    //     if(!confirm) return;
    //     const {data}=await axios.post(`/api/admin/delete-comment`,{id:_id});
        
    //     if(data.success){
    //       toast.success(data.message);
    //       fetchComments();
    //     }
    //     else{
    //       toast.error(data.message);
    //     }
    //   }catch(error){
    //     toast.error(error.message); 
    //   }
    // }


  return (
    <tr className='border-y border-gray-200'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-800'>Blog</b>:{blog.title}<br /><br/>
        <b className='font-medium text-gray-800'>Name</b>:{comment.name}<br /><br/>
        <b className='font-medium text-gray-800'>Comment</b>:{comment.content}
        
      </td>
      <td className='px-2 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-2 py-4 flex gap-3'>
        <div className='inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600'>
        {!comment.isApproved ?
        <img onClick={approveComment} src={assets.tick_icon} alt='Delete' className='w-8 hover:scale-110 transition-all cursor-pointer' /> :
        <p className='text-xs border border-green-700 text-green-700 px-2 py-0.5 rounded-full'>Approved</p>}

        <img onClick={deleteComment} src={assets.bin_icon} alt='Delete' className='w-8 hover:scale-110 transition-all cursor-pointer'/>
</div>
      </td>
    </tr>
  )
}

export default CommentTableItem;
