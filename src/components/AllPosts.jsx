import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ViewAllPosts = () => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/posts`).then(function (res) {
      setPosts(res.data.data);
      console.log(res.data.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner message="Loading posts..." />;

  // const getRandomImageUrl = () => {
  //   const randomImageUrl = `https://source.unsplash.com/random/800x600/?nature,water,landscape&${Math.random()}`;
  //   return randomImageUrl;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-red-200">
      <div className="container mx-auto py-8">
        <h1 className="font-semibold text-black text-4xl mb-6">All Posts</h1>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" onClick={() => navigate('/')}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Create Post
          </span>
        </button>
        {loading ? (
          <Spinner message="Loading posts..." />
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {posts.map((post) => (
                <Link
                  to={`/detail/${post._id}`}
                  key={post._id}
                  className="masonry-item"
                >
                  <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <h2 className="text-xl font-bold mb-2">{post.address}</h2>
                    <img
                      src={post.image}
                      alt={post.address}
                      className="mt-4 rounded-lg w-full h-auto"
                    />
                    <p className="text-gray-700">
                      {post.content.split(" ").slice(0, 10).join(" ")}
                    </p>
                  </div>
                </Link>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </div>
  );
};

export default ViewAllPosts;
