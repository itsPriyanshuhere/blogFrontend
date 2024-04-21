import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import Spinner from "./Spinner";

const NewPost = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async(e) => {
    console.log('called');
    e.preventDefault();
    try {
      setLoading(true)
      const {res} = await axios.post(`${server}/posts`, {
        address,
        content,
        image
      });
      setLoading(false);
      alert("Blog created successfully!");
      console.log(res);
      navigate("/viewAll");
    } catch (error) {
      alert("Failed to create blog: " + error.response.data.message);
    }
  };

  if (loading) return <Spinner message="Creating post..." />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-blue-700 to-red-200">
      <div className="absolute inset-0 flex justify-center items-center">
        <svg
          className="absolute inset-0"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <filter id="blurFilter" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          <g filter="url(#blurFilter)">
            <circle cx="100" cy="100" r="80" fill="#FCFBF4" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="container mx-auto max-w-screen-sm">
          <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Create a New Blog Post</h2>
            <div className="mb-4 relative">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-blue-500 text-black text-bold"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
            </div>
  
            <div className="mb-4 relative">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-blue-500 text-black text-bold"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
            </div>
  
            <div className="mb-4 relative">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-blue-500 text-black text-bold"
              />
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
            </div>
  
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"

              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}
export default NewPost;
