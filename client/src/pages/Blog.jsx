import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blog_data, assets, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext.jsx';
import { toast } from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const {axios}=useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState(''); // ✅ fixed typo

  const fetchBlogData = async () => {
    try{
      const {data}=await axios.get(`/api/blogs/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    }
    catch(error){
      console.error(error);
      toast.error("Failed to fetch blog data");
    }
  };

 const fetchComments = async () => {
  try {
    const { data } = await axios.get(`/api/blogs/comments/${id}`);
    if (data.success) {
      setComments(data.comments);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    // console.error(error);
    toast.error(error.message || "Failed to fetch comments");
  }
};

  const addComment = async (e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(`/api/blogs/add-comment`,{blog:id,name,content});
      if(data.success){
        toast.success(data.message);
        setName('');
        setContent('');
        fetchComments();
      } else {
        toast.error(data.message);
      }
    }
    catch(error){
      console.error(error);
      toast.error("Failed to add comment");
    }
    // Logic to add comment (optional)
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-700">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format('DD-MM-YYYY')}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/20 bg-primary/10 text-primary font-medium">
          William's O son's
        </p>
      </div>

      <div className="max-w-5xl mx-5 md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative p-4 border shadow-sm bg-white border-primary/10 max-w-xl rounded text-gray-700"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={assets.user_icon}
                    alt={item.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>

                <p className="text-sm max-w-md ml-18">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
                {/* <p className="mt-2 text-gray-700">{item.comment}</p> */}
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add Your Comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg mx-auto"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className="border border-gray-600 h-12 outline-none w-full px-3 text-gray-800 rounded-md"
              required
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              className="border border-gray-600 h-32 outline-none w-full px-3 text-gray-800 rounded-md"
              required
            ></textarea>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-all h-12 rounded-md cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Button Section ✅ fixed div issue */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">Share this article on Social Media</p>
          <div className="flex">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-10 h-10 mx-2 cursor-pointer"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-10 h-10 mx-2 cursor-pointer"
            />
           
            <img
              src={assets.googleplus_icon}
              alt="WhatsApp"
              className="w-10 h-10 mx-2 cursor-pointer"
              />
            
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  ) : (
    <Loader/>
  );
};

export default Blog;
