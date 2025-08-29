import React from 'react'
import { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets'; // assuming comments_data is an array of comments
import CommentTableItem from '../../components/Admin/CommentTableItem';
import {assets} from '../../assets/assets'; // assuming cross_icon is inside
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const Comment = () => {

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const {axios}=useAppContext();

const fetchComments=async()=>{
  // simulate API call
  try{
    const {data}=await axios.get('/api/admin/comments');
    data.success? setComments(data.comments):toast.error(data.message);
  } catch(error){
    toast.error(error.message);
  }
  
  
}
  useEffect(()=>{
  fetchComments();
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center mb-4'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button
            className={`px-4 py-2 rounded ${filter === 'Not Approved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setFilter('Not Approved')}
          >
            Not Approved
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === 'Approved' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setFilter('Approved')}
          >
            Approved
          </button>
        </div>

      </div>
      <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white mt-4'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase text-left bg-gray-50'>
            <tr>
            <th scope='col' className='px-2 py-4 xl:px-6'>BLOG TITLE &COMMENT</th>
            <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
            <th scope='col' className='px-2 py-4'>Action</th>
            </tr>
            </thead>
            <tbody>
               {comments.filter((comment)=>{
                if(filter==="Approved") return comment.isApproved===true;
                return comment.isApproved===false;

               }).map((comment,index)=><CommentTableItem key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments}/>)}
            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Comment
