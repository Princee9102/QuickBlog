import React, { useEffect, useState, useRef } from 'react';
import assets, { blogCategories } from '../../assets/assets';
import { blog_data } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Quill styling

import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import {parse} from 'marked';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding,setIsAdding]=useState(false);
  const [loading,setLoading]=useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [content, setContent] = useState("");

  const generateContent = async (e) => {
    // Replace with AI logic later
    if(!title){
      toast.error("Title is required for content generation.");
    }
   try{
    setLoading(true);
    const {data}=await axios.post('/api/blogs/generate-content',{prompt:title});
    if(data.success){
      quillRef.current.root.innerHTML=parse(data.content);
    }
    else{
      toast.error(data.message);
    }
   }
   catch(error){
    toast.error(error.message);

   }
   finally{
    setLoading(false);
   }
  };

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      setIsAdding(true);
      const blog={
        title,subtitle,
        description:quillRef.current.root.innerHTML,
        category,
        isPublished,
      }
      const formData=new FormData();
      formData.append('blog',JSON.stringify(blog));
      formData.append('image',image);

      const {data}=await axios.post('/api/blogs/add',formData);
      if(data.success){
        toast.success(data.message);
        setImage(false);
        setTitle("");
        setSubtitle("");
        setCategory("Startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
        toast.error(error.message);
    }
    finally{
      setIsAdding(false);
    }
    
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"]
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-700 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-rounded">
        
        {/* Upload Thumbnail */}
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Blog Subtitle */}
        <p className="mt-4">Blog Subtitle</p>
        <input
          type="text"
          placeholder="Enter blog subtitle"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        {/* Category */}
        <p className="mt-4">Blog Category</p>
        <select onChange={e=>setCategory(e.target.value)} name='Category' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'>
          <option value="">Select Category</option>
          {blogCategories.map((item,index)=>{
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}

        </select>

        {/* Blog Description */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg pb-16 sm:pb-10 pt-2 relative">
          <div
            ref={editorRef}
            className="bg-white border border-gray-300 rounded p-2 min-h-[200px]"
          ></div>
          {loading &&(
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2 rounded">
              <div className="w-8 h-8 rounded-full border-2  border-t-white animate-spin"></div>
            </div>
          )}
          <button
            type="button" disabled={loading}
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>
        
        <div className='flex gap-2 mt-4 items-center'>
          <p>Public Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>
        {/* Submit */}
        <button disabled={isAdding}
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
